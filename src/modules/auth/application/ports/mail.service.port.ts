import { Email } from '@/modules/user/domain/value-objects';

export interface MailService {
  sendOtp(email: Email, otp: number): Promise<void>;
}
