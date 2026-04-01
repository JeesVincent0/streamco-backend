import { ICreateAdvertiserUserUseCase } from '@/modules/user/application';
import { SignupAdvertiserInput } from '../../inputs';
import {
  IGenerateOtpUseCase,
  IPasswordHasher,
  ISignupAdvertiserUseCase,
} from '../../ports';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { GenerateOtpUsecaseOutPut } from '../../output';

export class SignupAdvertiserUseCase implements ISignupAdvertiserUseCase {
  constructor(
    private readonly _createAdvertiserUser: ICreateAdvertiserUserUseCase,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _generateOtpUseCase: IGenerateOtpUseCase,
  ) {}
  async execute(
    input: SignupAdvertiserInput,
  ): Promise<GenerateOtpUsecaseOutPut> {
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
