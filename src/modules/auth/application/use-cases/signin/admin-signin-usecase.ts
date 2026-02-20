import { UserRepositoryPort } from '@/modules/user/application';
import { SigninInput } from '../../inputs';
import { Email, Password } from '@/modules/user/domain';

export class AdminSigninUseCase {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async execute(input: SigninInput) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const user = await this._userRepo.findByEmail(email);
    console.log('This user entity from admin signin usecase: ', user);
    console.log('Password from user entity: ', password);
  }
}
