import { BaseUser } from '@/modules/user/domain';
import { IGoogleAuthInput } from '../../inputs';

export interface CreateUserWIthGoogleAuthPort {
  execute(input: IGoogleAuthInput): Promise<BaseUser>;
}
