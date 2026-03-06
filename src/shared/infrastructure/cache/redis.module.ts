import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { FileLogger } from '@/shared/logger/file-logger';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    redisProvider,
    RedisService,
    { provide: FileLogger, useClass: FileLogger },
  ],
  exports: [RedisService],
})
export class RedisModule {}
