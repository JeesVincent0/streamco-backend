import { ICreateAdvertiserUserUseCase } from '@/modules/user/application';
import { SignupAdvertiserInput } from '../../inputs';
import { IPasswordHasher } from '../../ports';
import { GenerateOtpUseCase } from '../otp';
import { OtpPurpose } from '@/modules/auth/domain/enums';

export class SignupAdvertiserUseCase {
  constructor(
    private readonly _createAdvertiserUser: ICreateAdvertiserUserUseCase,
    private readonly _passwordHasher: IPasswordHasher,
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
