import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateAvatarUrlType } from '../inputs/update-user/update-user-avatar.input';

export interface UpdateUserAvatarInterface {
  execute(input: UpdateAvatarUrlType): Promise<SucceessResType>;
}
