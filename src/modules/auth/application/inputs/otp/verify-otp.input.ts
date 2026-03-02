import { OtpPurpose } from '../../../domain/enums';

export interface VerifyOtpInput {
  id: string;
  otp: number;
  purpose: OtpPurpose;
}
