import { CreateAdvertiserUserInput } from '../../inputs';
import { CreateUserOutPut } from '../../output';

export interface CreateAdvertiserUserPort {
  execute(input: CreateAdvertiserUserInput): Promise<CreateUserOutPut>;
}
