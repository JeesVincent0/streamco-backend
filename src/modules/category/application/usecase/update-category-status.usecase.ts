import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateCategoryStatusInput } from '../inputs/update-category.input';
import { IUpdateCategoryStatusUsecase } from '../ports';
import type { ICategoryRepo } from '../ports/category-repository.port';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class UpdateCategoryStatusUsecase implements IUpdateCategoryStatusUsecase {
  constructor(private readonly _categoryRepo: ICategoryRepo) {}
  async execute(input: UpdateCategoryStatusInput): Promise<SucceessResType> {
    const categry = await this._categoryRepo.findById(input.id);
    if (!categry) {
      throw new BadRequestError(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    }
    categry?.setStatus(input.status);
    await this._categoryRepo.save(categry);

    return {
      status: 'success',
      message: 'Status changed successfully',
    };
  }
}
