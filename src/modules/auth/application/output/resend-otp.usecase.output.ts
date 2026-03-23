export interface ResendOtpUseCaseOutPut {
  status: string;
  message: string;
  data: {
    otpResendAt: Date;
  };
}
