import { SigninInput } from '../../inputs';
import { SigninUseCaseOutPut } from '../../output';

export interface IAdminSigninUseCase {
  execute(input: SigninInput): Promise<SigninUseCaseOutPut>;
}
