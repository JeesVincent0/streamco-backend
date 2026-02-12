import { CreateNormalUserInput } from '../../inputs/create-user/create-normal-user.input';

export interface CreateNormalUserPort {
  execute(input: CreateNormalUserInput);
}
