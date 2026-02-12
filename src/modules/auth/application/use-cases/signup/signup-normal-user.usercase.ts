import { SignupNormalUserInput } from '../../inputs';

export class SignupNormalUserUseCase {
  constructor() {}
  execute(input: SignupNormalUserInput) {
    console.log(input);
  }
}
