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
  private static readonly _max_verification_count =
    Number(process.env.MAX_VERIFICATION_COUNT) | 6;
  private static readonly _max_otp_generate_count =
    Number(process.env.MAX_OTP_GENERATE_COUNT) | 3;
  private static readonly _resend_after =
    Number(process.env.RESEND_AFTER) | 30_000;

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
      verificationCount: this._max_verification_count,
      otpGenerateCount: this._max_otp_generate_count,
      otpResendAt: new Date(Date.now() + this._resend_after),
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
      otpResendAt: new Date(Date.now() + this._resend_after),
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
