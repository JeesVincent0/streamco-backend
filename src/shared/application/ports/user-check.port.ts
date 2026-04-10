import { UserStatus } from '@/modules/user/domain';

export interface IUserCheck {
  isUserActive(userId: string): Promise<UserStatus | boolean>;
}
