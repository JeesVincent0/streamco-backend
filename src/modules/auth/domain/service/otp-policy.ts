export interface OtpSate {
  id: string;
  email: string;
  hashedOtp: string;
  verificationCount: number;
  otpGenerateCount: number;
  resendAvalableAt: Date;
}

export class OtpPolicy {
  private static readonly _MAX_VERIFICATION_COUNT = 6;
  private static readonly _MAX_OTP_GENERATE_COUNT = 3;
  private static readonly _RESEND_COUNTDOWN_MS = 30_000;

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

  static consumeAttempt(state: OtpSate): OtpSate {
    return {
      ...state,
      verificationCount: state.verificationCount - 1,
    };
  }

  static createStateAFterResendOtp(state: OtpSate, hashedOtp: string): OtpSate {
    return {
      ...state,
      otpGenerateCount: state.otpGenerateCount - 1,
      hashedOtp,
      resendAvalableAt: new Date(Date.now() + this._RESEND_COUNTDOWN_MS),
    };
  }

  static canResendOtp(state: OtpSate): boolean {
    return state.otpGenerateCount <= 0;
  }

  static isExhausted(state: OtpSate): boolean {
    return state.verificationCount <= 0;
  }
}
