import { OtpPurpose } from '@/modules/auth/domain';
import { VerifyOtpUseCase } from '../otp';
import { UniqueIdService } from '@/shared/domain';
import { TokenServicePort } from '@/modules/auth-security/application';
import { VerifyResetPasswordOtpInput } from '../../inputs';

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
      jti: UniqueIdService.generate(),
    });

    return { token };
  }
}
