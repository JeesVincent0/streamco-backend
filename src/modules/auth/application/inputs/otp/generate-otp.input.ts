import { OtpPurpose } from '@/modules/auth/domain';

export interface GenerateOtpInput {
  email: string;
  purpose: OtpPurpose;
}
