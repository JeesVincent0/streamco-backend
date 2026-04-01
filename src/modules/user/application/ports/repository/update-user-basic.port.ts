import { UpdateUserBasicInput } from '../../inputs/update-user';

export interface IUpdateUserBasicRepo {
  execute(input: UpdateUserBasicInput): Promise<void>;
}
