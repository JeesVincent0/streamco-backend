import { UpdateUserBasicInput } from '../../inputs/update-user';

export interface UpdateUserBasicPort {
  execute(input: UpdateUserBasicInput): Promise<void>;
}
