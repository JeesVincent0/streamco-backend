import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateCategoryStatusInput } from '../inputs/update-category.input';

export interface IUpdateCategoryStatusUsecase {
  execute(input: UpdateCategoryStatusInput): Promise<SucceessResType>;
}
