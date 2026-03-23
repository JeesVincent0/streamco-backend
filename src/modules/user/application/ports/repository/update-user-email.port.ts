import { UpdateUserEmailInput } from '../../inputs/update-user';

export interface IUpdateUserEmailRepo {
  execute(input: UpdateUserEmailInput): Promise<void>;
}
