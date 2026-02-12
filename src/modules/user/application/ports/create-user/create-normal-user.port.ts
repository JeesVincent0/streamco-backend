import { CreateNormalUserInput } from '../../inputs/create-user/create-normal-user.input';

export interface CreateNormalUser {
  execute(input: CreateNormalUserInput);
}
