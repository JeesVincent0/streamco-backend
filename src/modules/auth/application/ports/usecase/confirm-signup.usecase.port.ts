import { ConfirmRegistrationInput } from '../../inputs';
import { ConfirmSignupUseCaseOutPut } from '../../output';

export interface IConfirmSignupUserUseCase {
  execute(input: ConfirmRegistrationInput): Promise<ConfirmSignupUseCaseOutPut>;
}
