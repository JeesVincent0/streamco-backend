import { ConfirmRegistrationInput } from '../../inputs';
import { SigninUseCaseOutPut } from '../../output';

export interface IConfirmSignupUserUseCase {
  execute(input: ConfirmRegistrationInput): Promise<SigninUseCaseOutPut>;
}
