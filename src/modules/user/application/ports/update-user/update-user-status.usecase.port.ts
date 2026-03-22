import { UserStatus } from '@/modules/user/domain';
import { SucceessResType } from '@/shared/types/success-res.type';

export interface IUpdateUserStatusUseCase {
  execute(userId: string, newStatus: UserStatus): Promise<SucceessResType>;
}
