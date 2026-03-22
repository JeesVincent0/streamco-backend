import { SucceessOtpSend } from '../../output';
import { UpdateUserEmailInput } from '../../inputs/update-user';

export interface IUpdateUserEmailUseCase {
  execute(input: UpdateUserEmailInput): Promise<SucceessOtpSend>;
}
