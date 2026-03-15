import { OtpPurpose } from '@/modules/auth/domain';
import { VerifyOtpInput } from '../input';

export interface VerifyOtpInterface {
  execute(
    input: VerifyOtpInput,
  ): Promise<{ email: string; purpose: OtpPurpose }>;
}
