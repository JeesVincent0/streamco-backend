import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateCategoryInput } from '../inputs';

export interface CreateCategoryPort {
  execute(input: CreateCategoryInput): Promise<SucceessResType>;
}
