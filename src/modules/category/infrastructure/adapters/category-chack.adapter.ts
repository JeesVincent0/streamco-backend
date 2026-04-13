import { Inject, Injectable } from '@nestjs/common';
import { type ICategoryRepo } from '../../application/ports';
import { CATEGORY_REPO_TOKEN } from '../../application/token';
import { ICategoryChecker } from '@/modules/live/application/ports';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

@Injectable()
export class CategoryCheckerImpl implements ICategoryChecker {
  constructor(
    @Inject(CATEGORY_REPO_TOKEN)
    private readonly _categoryRepo: ICategoryRepo,
  ) {}
  async isCategoryActive(categoryId: string): Promise<boolean> {
    const category = await this._categoryRepo.findById(categoryId);

    if (!category) return false;

    return category.status === CATEGORY_STATUS.ACTIVE;
  }
}
