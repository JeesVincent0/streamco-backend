import { BadRequestError } from '@/shared/errors';
import { OtpPurpose } from '@/modules/auth/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export interface OtpState {
  id: string;
  email: string;
  hashedOtp: string;
  purpose: OtpPurpose;
  verificationCount: number;
  otpGenerateCount: number;
  otpResendAt: Date;
}

export class OtpPolicy {
  private static readonly _MAX_VERIFICATION_COUNT = 6;
  private static readonly _MAX_OTP_GENERATE_COUNT = 3;
  private static readonly _RESEND_AFTER = 30_000;

  static createInitialState(
    id: string,
    email: string,
    hashedOtp: string,
    purpose: OtpPurpose,
  ): OtpState {
    return {
      id,
      email,
      hashedOtp,
      purpose,
      verificationCount: this._MAX_VERIFICATION_COUNT,
      otpGenerateCount: this._MAX_OTP_GENERATE_COUNT,
      otpResendAt: new Date(Date.now() + this._RESEND_AFTER),
    };
  }

  static consumeAttempt(state: OtpState): OtpState {
    return {
      ...state,
      verificationCount: state.verificationCount - 1,
    };
  }

  static createStateAFterResendOtp(
    state: OtpState,
    hashedOtp: string,
  ): OtpState {
    return {
      ...state,
      otpGenerateCount: state.otpGenerateCount - 1,
      hashedOtp,
      otpResendAt: new Date(Date.now() + this._RESEND_AFTER),
    };
  }

  static canResendOtp(state: OtpState): void {
    if (state.otpGenerateCount <= 0) {
      throw new BadRequestError(ERROR_MESSAGES.TOO_MANY_ATTEM);
    }
  }

  static isExhausted(state: OtpState): boolean {
    return state.verificationCount <= 0;
  }
}
