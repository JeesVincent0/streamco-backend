export type CachedUser = {
  id: string;
  email: string;
  hashedOtp: string;
  verificationAttempts: number;
  OtpGenerateCount: number;
  resendTime: Date;
};
