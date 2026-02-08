import { SigninInput } from '../inputs';

export class SigninUseCase {
  constructor() {}
  execute(input: SigninInput) {
    console.log(input);
  }
}
