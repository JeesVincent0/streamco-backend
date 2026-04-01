import { ICreateNormalUserUseCase } from '@/modules/user/application';
import { SignupNormalUserInput } from '../../inputs';
import {
  IGenerateOtpUseCase,
  IPasswordHasher,
  ISignupNormalUserUseCase,
} from '../../ports';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { GenerateOtpUsecaseOutPut } from '../../output';

export class SignupNormalUserUseCase implements ISignupNormalUserUseCase {
  constructor(
    private readonly _createNormalUser: ICreateNormalUserUseCase,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _generateOtpUseCase: IGenerateOtpUseCase,
  ) {}
  async execute(
    input: SignupNormalUserInput,
  ): Promise<GenerateOtpUsecaseOutPut> {
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
