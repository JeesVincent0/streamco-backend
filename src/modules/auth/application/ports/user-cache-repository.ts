import { Email } from '@/modules/user/domain/value-objects';

export abstract class AuthCachedUserRepository {
  abstract get<T>(key: Email): Promise<T | null>;
  abstract save(key: Email, value: any, ttlSeconds: number): Promise<void>;
}
