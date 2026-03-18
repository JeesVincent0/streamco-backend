import type { BaseRepositoryPort } from '@/shared/infrastructure/ports';
import { Category } from '../../domain/entity';

export interface CategoryRepoPort extends BaseRepositoryPort<Category> {
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  save(entity: Category): Promise<Category>;
}
