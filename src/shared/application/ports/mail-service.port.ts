import { Email } from '@/modules/user/domain';

export interface IMailService {
  execute(email: Email, otp: number): Promise<void>;
}
