import { OtpPurpose } from '@/modules/auth/domain';
import { VerifyResetPasswordOtpInput } from '../../inputs/reset-password/verify-reset-password-otp.input';
import { VerifyOtpUseCase } from '../otp';
import { TokenServicePort } from '../../ports';

export class VerifyResetPasswordOtpUseCase {
  constructor(
    private readonly _verifyOtpUseCase: VerifyOtpUseCase,
    private readonly _tokenService: TokenServicePort,
  ) {}

  async execute(input: VerifyResetPasswordOtpInput) {
    await this._verifyOtpUseCase.execute({
      id: input.id,
      otp: input.otp,
      purpose: OtpPurpose.RESET_PASSWORD,
    });

    const token = await this._tokenService.generateResetPasswordToken({
      sub: input.id,
    });

    return { token };
  }
}
