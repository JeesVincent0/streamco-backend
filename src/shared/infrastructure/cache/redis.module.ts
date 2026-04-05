import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { FileLogger } from '@/shared/logger/file-logger';
import { REDIS_IMPLE_TOKEN } from './token';
import { RedisAuthCachedUserRepository } from './repositories/redis-auth-cached-user.repository';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    redisProvider,
    RedisService,
    { provide: FileLogger, useClass: FileLogger },
    {
      provide: REDIS_IMPLE_TOKEN,
      useFactory: (redisService: RedisService) => {
        return new RedisAuthCachedUserRepository(redisService);
      },
      inject: [RedisService],
    },
  ],
  exports: [RedisService, REDIS_IMPLE_TOKEN],
})
export class RedisModule {}
