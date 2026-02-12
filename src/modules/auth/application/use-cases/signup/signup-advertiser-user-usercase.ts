import { SignupAdvertiserInput } from '../../inputs';

export class SignupAdvertiserUseCase {
  constructor() {}
  execute(input: SignupAdvertiserInput) {
    console.log(input);
  }
}
