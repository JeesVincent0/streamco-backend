import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateCategoryInput } from '../inputs';

export interface ICreateCategoryUasecase {
  execute(input: CreateCategoryInput): Promise<SucceessResType>;
}
