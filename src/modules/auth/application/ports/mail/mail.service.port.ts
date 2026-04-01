import { Email } from '@/modules/user/domain/value-objects';

export interface IMailService {
  sendOtp(email: Email, otp: number): Promise<void>;
}
