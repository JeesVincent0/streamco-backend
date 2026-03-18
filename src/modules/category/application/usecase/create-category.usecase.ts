import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateCategoryInput } from '../inputs';
import { CreateCategoryPort } from '../ports';
import type { CategoryRepoPort } from '../ports/category-repository.port';

export class CreateCategoryUasecase implements CreateCategoryPort {
  constructor(private readonly _categoryRepo: CategoryRepoPort) {}
  async execute(input: CreateCategoryInput): Promise<SucceessResType> {
    console.log(input);
    const category = await this._categoryRepo.findBySlug(input.slug);
    if (!category) {
      return { status: 'success', message: 'asdf' };
    }
    return {
      status: 'success',
      message: 'Category created successfully',
    };
  }
}
