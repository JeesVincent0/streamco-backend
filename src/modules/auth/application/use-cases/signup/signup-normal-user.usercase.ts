import { CreateNormalUserPort } from '@/modules/user/application';
import { SignupNormalUserInput } from '../../inputs';
import { PasswordHasherPort } from '../../ports';

export class SignupNormalUserUseCase {
  constructor(
    private readonly _createNormalUser: CreateNormalUserPort,
    private readonly _passwordHasher: PasswordHasherPort,
  ) {}
  async execute(input: SignupNormalUserInput) {
    const hashPassword = await this._passwordHasher.hash(input.password);
    this._createNormalUser.execute({ ...input, password: hashPassword });
  }
}
