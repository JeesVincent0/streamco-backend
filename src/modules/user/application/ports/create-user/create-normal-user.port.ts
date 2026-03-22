import { CreateNormalUserInput } from '../../inputs/create-user/create-normal-user.input';
import { CreateUserOutPut } from '../../output';

export interface ICreateNormalUserUseCase {
  execute(input: CreateNormalUserInput): Promise<CreateUserOutPut>;
}
