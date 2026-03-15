import { OtpPurpose } from '@/modules/auth/domain';
import { Email } from '@/modules/user/domain';

export interface SendOtpInterface {
  execute(
    id: string,
    email: Email,
    purpose: OtpPurpose,
  ): Promise<{ id: string; purpose: OtpPurpose; otpResendAt: Date }>;
}
