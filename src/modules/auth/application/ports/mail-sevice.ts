import { Email } from '@/modules/user/domain/value-objects';

export abstract class MailService {
  abstract sendOtp(email: Email, otp: number): Promise<void>;
}
