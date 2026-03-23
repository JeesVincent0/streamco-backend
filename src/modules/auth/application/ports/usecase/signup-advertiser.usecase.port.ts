import { SignupAdvertiserInput } from '../../inputs';
import { GenerateOtpUsecaseOutPut } from '../../output';

export interface ISignupAdvertiserUseCase {
  execute(input: SignupAdvertiserInput): Promise<GenerateOtpUsecaseOutPut>;
}
