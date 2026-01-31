import { Email } from '@/shared/domain/value-objects';

export interface MailService {
  sendOtp(email: Email, otp: number): Promise<void>;
}
