export interface BaseRepositoryPort<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}
