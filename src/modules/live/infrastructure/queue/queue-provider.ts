import { REDIS_CLIENT } from '@/shared/infrastructure/cache/redis.provider';
import { Provider } from '@nestjs/common';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

export const LIVE_QUEUE_TOKEN = Symbol('ILiveQueue');

export const queueProvider: Provider = {
  provide: LIVE_QUEUE_TOKEN,
  useFactory: (redis: Redis) => {
    return new Queue('live-queue', {
      connection: redis,
    });
  },
  inject: [REDIS_CLIENT],
};
