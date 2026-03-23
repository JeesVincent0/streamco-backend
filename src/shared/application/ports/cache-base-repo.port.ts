export interface ICacheBaseRepo {
  get<T>(key: string): Promise<T | null>;
  save(key: string, value: any, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}
