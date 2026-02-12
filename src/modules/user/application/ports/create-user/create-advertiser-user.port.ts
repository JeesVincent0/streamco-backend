import { CreateAdvertiserUserInput } from '../../inputs';

export interface CreateAdvertiserUserPort {
  execute(input: CreateAdvertiserUserInput);
}
