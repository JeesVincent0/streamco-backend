import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateCategoryInput } from '../inputs';
import { CreateCategoryPort } from '../ports';
import type { CategoryRepoPort } from '../ports/category-repository.port';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { Category } from '../../domain/entity';
import { Slug } from '../../domain/value-objects';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export class CreateCategoryUasecase implements CreateCategoryPort {
  constructor(private readonly _categoryRepo: CategoryRepoPort) {}
  async execute(input: CreateCategoryInput): Promise<SucceessResType> {
    const slug = Slug.create(input.slug);
    const category = await this._categoryRepo.findBySlug(slug);
    if (category) {
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_SLUG);
    }

    const categoryEntity = Category.create({
      name: input.name,
      slug,
      description: input.description || '',
      status: input.status as CATEGORY_STATUS,
    });

    await this._categoryRepo.save(categoryEntity);
    return {
      status: 'success',
      message: 'Category created successfully',
    };
  }
}
