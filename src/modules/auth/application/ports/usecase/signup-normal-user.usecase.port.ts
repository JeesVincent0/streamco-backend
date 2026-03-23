import { SignupNormalUserInput } from '../../inputs';
import { GenerateOtpUsecaseOutPut } from '../../output';

export interface ISignupNormalUserUseCase {
  execute(input: SignupNormalUserInput): Promise<GenerateOtpUsecaseOutPut>;
}
