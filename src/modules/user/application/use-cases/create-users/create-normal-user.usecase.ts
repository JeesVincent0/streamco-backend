import { CreateNormalUserInput } from '../../inputs';
// import { CreateUserOutPut } from '../../output';
import { CreateNormalUserPort } from '../../ports';

export class CreateNormalUserUseCase implements CreateNormalUserPort {
  constructor() {}
  execute(input: CreateNormalUserInput) {
    console.log('This data is from normal user: ', input);
  }
}
