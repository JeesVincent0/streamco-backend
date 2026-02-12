import { CreateNormalUserInput } from '../inputs';
import { CreateUserOutPut } from '../output';
import { CreateNormalUser } from '../ports';

export class CreateNormalUserUseCase implements CreateNormalUser {
  constructor() {}
  execute(input: CreateNormalUserInput): Promise<CreateUserOutPut> {}
}
