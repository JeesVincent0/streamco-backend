import { UpdateUserEmailInput } from '../../inputs/update-user';

export interface UpdateUserEmailPort {
  execute(input: UpdateUserEmailInput): Promise<void>;
}
