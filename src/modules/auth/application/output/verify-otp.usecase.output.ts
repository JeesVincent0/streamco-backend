import { OtpPurpose } from '../../domain';

export interface VerifyOtpUseCaseOutput {
  email: string;
  purpose: OtpPurpose;
}
