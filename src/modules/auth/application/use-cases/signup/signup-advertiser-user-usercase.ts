import { CreateAdvertiserUserPort } from '@/modules/user/application';
import { SignupAdvertiserInput } from '../../inputs';
import { PasswordHasherPort } from '../../ports';
import { GenerateOtpUseCase } from '../otp';
import { OtpPurpose } from '@/modules/auth/domain/enums';

export class SignupAdvertiserUseCase {
  constructor(
    private readonly _createAdvertiserUser: CreateAdvertiserUserPort,
    private readonly _passwordHasher: PasswordHasherPort,
    private readonly _generateOtpUseCase: GenerateOtpUseCase,
  ) {}
  async execute(input: SignupAdvertiserInput) {
    const hashPassword = await this._passwordHasher.hash(input.password);
    const { email } = await this._createAdvertiserUser.execute({
      ...input,
      password: hashPassword,
    });

    const otpResult = await this._generateOtpUseCase.execute({
      email: email.getValue(),
      purpose: OtpPurpose.REGISTRATION,
    });

    return otpResult;
  }
}
