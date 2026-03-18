import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateCategoryStatusInput } from '../inputs/update-category.input';

export interface UpdateCategoryStatusPort {
  execute(input: UpdateCategoryStatusInput): Promise<SucceessResType>;
}
