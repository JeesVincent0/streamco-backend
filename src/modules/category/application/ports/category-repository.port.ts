import type { BaseRepositoryPort } from '@/shared/infrastructure/ports';
import { Category } from '../../domain/entity';
import { Slug } from '../../domain/value-objects';

export interface ICategoryRepo extends BaseRepositoryPort<Category> {
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: Slug): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  save(entity: Category): Promise<Category>;
}
