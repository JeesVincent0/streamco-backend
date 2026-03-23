import { OtpPurpose } from '../../domain';

export interface GenerateOtpUsecaseOutPut {
  status: string;
  message: string;
  data: {
    id: string;
    purpose: OtpPurpose;
    otpResendAt: Date;
  };
}
