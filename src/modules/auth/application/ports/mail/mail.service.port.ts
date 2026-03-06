import { Email } from '@/modules/user/domain/value-objects';

export interface MailServicePort {
  sendOtp(email: Email, otp: number): Promise<void>;
}
