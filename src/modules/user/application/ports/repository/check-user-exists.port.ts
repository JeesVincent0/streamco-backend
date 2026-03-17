import { Email } from '@/modules/user/domain';

export interface CheckUserExistsPort {
  execute(email: Email, excludeUserId: string): Promise<boolean>;
}
