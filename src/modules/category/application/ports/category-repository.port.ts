import type { IBaseRepositoryPort } from '@/shared/application/ports';
import { Category } from '../../domain/entity';
import { Slug } from '../../domain/value-objects';

export interface ICategoryRepo extends IBaseRepositoryPort<Category> {
  save(entity: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: Slug): Promise<Category | null>;
}
