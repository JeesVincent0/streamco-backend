import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserEmailInput } from '../inputs/update-user';

export interface UpdateUserEmailInterface {
  execute(input: UpdateUserEmailInput): Promise<SucceessResType>;
}
