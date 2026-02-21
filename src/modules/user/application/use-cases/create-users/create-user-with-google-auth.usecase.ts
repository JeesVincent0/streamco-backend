import { IGoogleAuthInput } from '../../inputs';
import { UserRepositoryPort } from '../../ports';

export class CreateUserWithGoogleAuthUseCase {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async execute(input: IGoogleAuthInput) {
    console.log('This data is from user module: ', input);
  }
}
