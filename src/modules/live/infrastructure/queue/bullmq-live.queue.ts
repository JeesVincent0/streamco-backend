import { Queue } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { ILiveQueue } from '../../application/ports';
import { LIVE_QUEUE_TOKEN } from './queue-provider';
import { type ILogger, LOGGER_TOKEN } from '@/shared/logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { LOG_CONTEXT } from '@/shared/constants/log-context.constants';

export const LIVE_QUEUE_SERVICE = Symbol('ILiveQueue');

@Injectable()
export class BullMQLiveQueue implements ILiveQueue {
  constructor(
    @Inject(LOGGER_TOKEN) private readonly _logger: ILogger,
    @Inject(LIVE_QUEUE_TOKEN) private readonly _liveQueue: Queue,
  ) {}

  async scheduledLiveAutoCancel(
    liveId: string,
    scheduledAt: Date,
  ): Promise<void> {
    const cancelTime = new Date(scheduledAt.getTime() + 10 * 60 * 1000);
    const delayTime = cancelTime.getTime() - Date.now();

    await this._liveQueue.add(
      'auto-cancel-live',
      {
        liveId,
      },
      {
        delay: delayTime,
        jobId: `cancel-${liveId}`,
        attempts: 3,
        removeOnComplete: true,
      },
    );

    this._logger.log({
      event: LOG_EVENTS.SCHEDULED_LIVE_AUTO_CANCELATION_ADDED_TO_QUEUE,
      constext: LOG_CONTEXT.BULL_MQ_LIVE_QUEUE,
      liveId,
    });
  }

  async cancelScheduledJob(liveId: string): Promise<void> {
    const jobId = `cancel-${liveId}`;
    const job = await this._liveQueue.getJob(jobId);

    if (job) {
      await job.remove();
      this._logger.log({
        event: LOG_EVENTS.SCHEDULED_LIVE_AUTO_CANCELATION_REMOVED_FROM_QUEUE,
        constext: LOG_CONTEXT.BULL_MQ_LIVE_QUEUE,
        liveId,
      });
    }
  }
}
