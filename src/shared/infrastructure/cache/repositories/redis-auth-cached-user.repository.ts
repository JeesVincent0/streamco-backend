import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { AuthCachedUserRepository } from '@/modules/auth/application/ports';
import { Email } from '@/modules/user/domain/value-objects';

@Injectable()
export class RedisAuthCachedUserRepository extends AuthCachedUserRepository {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  private buildKey(email: Email): string {
    return `auth:user:${email.getValue()}`;
  }

  async get<T>(key: Email): Promise<T | null> {
    return this.redisService.get<T>(this.buildKey(key));
  }

  async save(key: Email, value: any, ttlSeconds: number): Promise<void> {
    await this.redisService.set(this.buildKey(key), value, ttlSeconds);
  }
}
