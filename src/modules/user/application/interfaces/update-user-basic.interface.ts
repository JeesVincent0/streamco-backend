import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserBasicInput } from '../inputs/update-user';

export interface UpdateUserBasicInterface {
  execute(input: UpdateUserBasicInput): Promise<SucceessResType>;
}
