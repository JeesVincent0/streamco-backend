import { OtpPurpose } from '@/modules/auth/domain';

export interface VerifyOtpInput {
  id: string;
  otp: number;
  purpose: OtpPurpose;
}
