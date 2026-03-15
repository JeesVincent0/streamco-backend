import { Email } from '@/modules/user/domain';

export interface MailServicePort {
  execute(email: Email, otp: number): Promise<void>;
}
