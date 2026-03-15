import { UpdateUserEmailInput } from '../inputs/update-user';
import { SucceessOtpSend } from '../output';

export interface UpdateUserEmailInterface {
  execute(input: UpdateUserEmailInput): Promise<SucceessOtpSend>;
}
