import { ResetPasswordInput } from '../../inputs';
import { ResetPasswordUseCaseOutPut } from '../../output';

export interface IResetPasswordUseCase {
  execute(input: ResetPasswordInput): Promise<ResetPasswordUseCaseOutPut>;
}
