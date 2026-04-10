import { Global, Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { ICacheBaseRepo } from '@/shared/application/ports';

@Global()
@Injectable()
export class RedisAuthCachedUserRepository implements ICacheBaseRepo {
  constructor(private readonly redisService: RedisService) {}

  private buildKey(key: string): string {
    return `auth:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    return this.redisService.get<T>(this.buildKey(key));
  }

  async save(key: string, value: any, ttlSeconds: number): Promise<void> {
    await this.redisService.set(this.buildKey(key), value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this.redisService.del(this.buildKey(key));
  }
}
