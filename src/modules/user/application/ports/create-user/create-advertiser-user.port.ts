import { CreateAdvertiserUserInput } from '../../inputs';
import { CreateUserOutPut } from '../../output';

export interface ICreateAdvertiserUserUseCase {
  execute(input: CreateAdvertiserUserInput): Promise<CreateUserOutPut>;
}
