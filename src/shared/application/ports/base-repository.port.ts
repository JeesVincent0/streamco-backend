export interface IBaseRepositoryPort<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
}
