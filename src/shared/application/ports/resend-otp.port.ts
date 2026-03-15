export interface ResendOtpInterface {
  execute(input: { id: string }): Promise<{ otpResendAt: Date }>;
}
