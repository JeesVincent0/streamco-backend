import { OtpPurpose } from '@/modules/auth/domain';
import { VerifyResetPasswordOtpInput } from '../../inputs/reset-password/verify-reset-password-otp.input';
import { VerifyOtpUseCase } from '../otp';

export class VerifyResetPasswordOtpUseCase {
  constructor(private readonly _verifyOtpUseCase: VerifyOtpUseCase) {}

  async execute(input: VerifyResetPasswordOtpInput) {
    await this._verifyOtpUseCase.execute({
      id: input.id,
      otp: input.otp,
      purpose: OtpPurpose.RESET_PASSWORD,
    });

    return {
      status: 'success',
      message: 'OTP verified successfully',
      data: {
        id: input.id,
      },
    };
  }
}
