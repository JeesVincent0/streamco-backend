import { OtpPurpose } from '@/modules/auth/domain';
import { UniqueIdService } from '@/shared/domain';
import { TokenServicePort } from '@/modules/auth-security/application';
import { VerifyResetPasswordOtpInput } from '../../inputs';
import { IVerifyOtpUseCase, IVerifyResetPasswordOtpUseCase } from '../../ports';

export class VerifyResetPasswordOtpUseCase implements IVerifyResetPasswordOtpUseCase {
  constructor(
    private readonly _verifyOtpUseCase: IVerifyOtpUseCase,
    private readonly _tokenService: TokenServicePort,
  ) {}

  async execute(
    input: VerifyResetPasswordOtpInput,
  ): Promise<{ token: string }> {
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
