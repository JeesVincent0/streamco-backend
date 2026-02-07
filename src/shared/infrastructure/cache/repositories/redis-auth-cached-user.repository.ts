import { Global, Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { AuthCachedUserRepository } from '@/modules/auth/application/ports';
import { BadRequestError } from '@/shared/errors';

@Global()
@Injectable()
export class RedisAuthCachedUserRepository extends AuthCachedUserRepository {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  private buildKey(key: string): string {
    return `auth:user:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      return this.redisService.get<T>(this.buildKey(key));
    } catch (err) {
      console.log(err);
      throw new BadRequestError('Server error');
    }
  }

  async save(key: string, value: any, ttlSeconds: number): Promise<void> {
    await this.redisService.set(this.buildKey(key), value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this.redisService.del(this.buildKey(key));
  }
}
