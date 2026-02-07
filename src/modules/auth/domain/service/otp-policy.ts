export interface OtpSate {
  id: string;
  email: string;
  hashedOtp: string;
  verificationCount: number;
  otpGenerateCount: number;
  resendAvalableAt;
}

export class OtpPolicy {
  private static readonly _MAX_VERIFICATION_COUNT = 6;
  private static readonly _MAX_OTP_GENERATE_COUNT = 5;
  private static readonly _RESEND_COUNTDOWN_MS = 60_000;

  static createInitialState(
    id: string,
    email: string,
    hashedOtp: string,
  ): OtpSate {
    return {
      id,
      email,
      hashedOtp,
      verificationCount: this._MAX_VERIFICATION_COUNT,
      otpGenerateCount: this._MAX_OTP_GENERATE_COUNT,
      resendAvalableAt: new Date(Date.now() + this._RESEND_COUNTDOWN_MS),
    };
  }
}
