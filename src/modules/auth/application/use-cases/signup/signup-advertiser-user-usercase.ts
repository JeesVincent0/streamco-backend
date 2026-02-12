import { CreateAdvertiserUserPort } from '@/modules/user/application';
import { SignupAdvertiserInput } from '../../inputs';

export class SignupAdvertiserUseCase {
  constructor(
    private readonly _createAdvertiserUser: CreateAdvertiserUserPort,
  ) {}
  execute(input: SignupAdvertiserInput) {
    this._createAdvertiserUser.execute(input);
  }
}
