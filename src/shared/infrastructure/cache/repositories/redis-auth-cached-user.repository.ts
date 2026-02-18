import { Global, Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { BaseCachedUserRepositoryPort } from '@/modules/auth/application/ports';
import { BadRequestError } from '@/shared/errors';
import { FileLogger } from '@/shared/logger/file-logger';

@Global()
@Injectable()
export class RedisAuthCachedUserRepository implements BaseCachedUserRepositoryPort {
  constructor(
    private readonly redisService: RedisService,
    private readonly _logger: FileLogger,
  ) {}

  private buildKey(key: string): string {
    return `auth:user:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      return this.redisService.get<T>(this.buildKey(key));
    } catch (err) {
      this._logger.error(err);
      throw new BadRequestError('Server error');
    }
  }

  async save(key: string, value: any, ttlSeconds: number): Promise<void> {
    try {
      await this.redisService.set(this.buildKey(key), value, ttlSeconds);
    } catch (error) {
      this._logger.error(error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisService.del(this.buildKey(key));
    } catch (error) {
      this._logger.error(error);
    }
  }
}
