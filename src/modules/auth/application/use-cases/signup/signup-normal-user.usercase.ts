import { CreateNormalUserPort } from '@/modules/user/application';
import { SignupNormalUserInput } from '../../inputs';
import { PasswordHasherPort } from '../../ports';
import { GenerateOtpUseCase } from '../otp';
import { OtpPurpose } from '@/modules/auth/domain/enums';

export class SignupNormalUserUseCase {
  constructor(
    private readonly _createNormalUser: CreateNormalUserPort,
    private readonly _passwordHasher: PasswordHasherPort,
    private readonly _generateOtpUseCase: GenerateOtpUseCase,
  ) {}
  async execute(input: SignupNormalUserInput) {
    const hashPassword = await this._passwordHasher.hash(input.password);

    const { email } = await this._createNormalUser.execute({
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
