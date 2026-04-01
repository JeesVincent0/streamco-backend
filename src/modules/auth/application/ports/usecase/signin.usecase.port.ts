import { SigninInput } from '../../inputs';
import { SigninUseCaseOutPut } from '../../output';

export interface ISigninUseCase {
  execute(input: SigninInput): Promise<SigninUseCaseOutPut>;
}
