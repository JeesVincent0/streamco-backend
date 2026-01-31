import { Email } from '@/shared/domain/value-objects';

export interface AuthCachedUserRepository {
  get<T>(key: Email): Promise<T | null>;
  save(key: Email, value: any, ttlSeconds: number): Promise<void>;
}
