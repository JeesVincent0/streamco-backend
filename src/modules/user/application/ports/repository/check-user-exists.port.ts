import { Email } from '@/modules/user/domain';

export interface ICheckUserExists {
  execute(email: Email, excludeUserId: string): Promise<boolean>;
}
