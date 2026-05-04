import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { REDIS_CLIENT, redisProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { FileLogger } from '@/shared/logger/file-logger';

import { RedisAuthCachedUserRepository } from './repositories/redis-auth-cached-user.repository';
import { CHACHE_REPO_TOKEN } from './token';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    redisProvider,
    RedisService,
    { provide: FileLogger, useClass: FileLogger },
    {
      provide: CHACHE_REPO_TOKEN,
      useFactory: (redisService: RedisService) => {
        return new RedisAuthCachedUserRepository(redisService);
      },
      inject: [RedisService],
    },
  ],
  exports: [RedisService, CHACHE_REPO_TOKEN, REDIS_CLIENT],
})
export class RedisModule {}
