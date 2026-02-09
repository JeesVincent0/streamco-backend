import { OtpPurpose } from '../../domain/enums';

export interface GenerateOtpInput {
  email: string;
  purpose: OtpPurpose;
}
