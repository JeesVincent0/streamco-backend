export const TOKEN_BLACK_LIST_CACHE = Symbol('TOKEN_BLACK_LIST_CACHE');

export interface BaseCachedUserRepositoryPort {
  get<T>(key: string): Promise<T | null>;
  save(key: string, value: any, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}
