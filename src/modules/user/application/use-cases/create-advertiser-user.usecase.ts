import { CreateAdvertiserUserInput } from '../inputs';
import { CreateUserOutPut } from '../output';
import { CreateAdvertiserUser } from '../ports';

export class CreateAdvertiserUserUseCase implements CreateAdvertiserUser {
  constructor() {}
  execute(input: CreateAdvertiserUserInput): Promise<CreateUserOutPut> {}
}
