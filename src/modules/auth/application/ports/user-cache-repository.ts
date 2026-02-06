export abstract class AuthCachedUserRepository {
  abstract get<T>(key: string): Promise<T | null>;
  abstract save(key: string, value: any, ttlSeconds: number): Promise<void>;
  abstract del(key: string): Promise<void>;
}
