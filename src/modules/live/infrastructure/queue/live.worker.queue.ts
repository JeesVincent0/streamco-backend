import Redis from 'ioredis';
import { Job, Worker } from 'bullmq';
import { type ILiveRepo } from '../../application/ports';
import { type ILogger, LOGGER_TOKEN } from '@/shared/logger';
import { LIVE_REPOSITORY_TOKEN } from '../../application/tokens';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { LOG_CONTEXT } from '@/shared/constants/log-context.constants';
import { REDIS_CLIENT } from '@/shared/infrastructure/cache/redis.provider';

@Injectable()
export class LiveQueueWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) private readonly _redis: Redis,
    @Inject(LOGGER_TOKEN) private readonly _logger: ILogger,
    @Inject(LIVE_REPOSITORY_TOKEN) private readonly _liveRepo: ILiveRepo,
  ) {}

  onModuleInit() {
    new Worker(
      'live-queue',
      async (job: Job) => {
        if (job.name === 'auto-cancel-live') {
          const { liveId } = job.data as { liveId: string };
          await this.cancelLive(liveId);
        }
      },
      {
        connection: this._redis,
        concurrency: 5,
      },
    );
  }

  async cancelLive(liveId: string) {
    await this._liveRepo.scheduledLiveAutoCancel(liveId);
    this._logger.log({
      event: LOG_EVENTS.AUTO_SCHEDULED_LIVE_CANCELATION,
      context: LOG_CONTEXT.CANCEL_LIVE,
      liveId,
    });
  }
}
