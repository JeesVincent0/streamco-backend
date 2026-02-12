import { CreateNormalUserPort } from '@/modules/user/application';
import { SignupNormalUserInput } from '../../inputs';

export class SignupNormalUserUseCase {
  constructor(private readonly _createNormalUser: CreateNormalUserPort) {}
  execute(input: SignupNormalUserInput) {
    this._createNormalUser.execute(input);
  }
}
