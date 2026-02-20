import { RedisService } from '@/shared/infrastructure/cache/redis.service';
import { BaseCachedUserRepositoryPort } from '../../application';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisTokenBlackListRepository implements BaseCachedUserRepositoryPort {
  constructor(private readonly _redisService: RedisService) {}
  private buildKey(key: string): string {
    return `token:blackList:${key}`;
  }
  async get<T>(key: string): Promise<T | null> {
    const tokenBlacklist = await this._redisService.get<T>(this.buildKey(key));
    if (!tokenBlacklist) return null;
    return tokenBlacklist;
  }

  async save(key: string, value: any, ttlSeconds: number): Promise<void> {
    await this._redisService.set(this.buildKey(key), value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this._redisService.del(this.buildKey(key));
  }
}
