import { ICreateNormalUserUseCase } from '@/modules/user/application';
import { SignupNormalUserInput } from '../../inputs';
import { IPasswordHasher } from '../../ports';
import { GenerateOtpUseCase } from '../otp';
import { OtpPurpose } from '@/modules/auth/domain/enums';

export class SignupNormalUserUseCase {
  constructor(
    private readonly _createNormalUser: ICreateNormalUserUseCase,
    private readonly _passwordHasher: IPasswordHasher,
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
