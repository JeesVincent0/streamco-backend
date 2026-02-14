import { Advertiser, Email, HashedPassword } from '@/modules/user/domain';
import { CreateAdvertiserUserInput } from '../../inputs';
import { CreateUserOutPut } from '../../output';
import { CreateAdvertiserUserPort, UserRepositoryPort } from '../../ports';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class CreateAdvertiserUserUseCase implements CreateAdvertiserUserPort {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async execute(input: CreateAdvertiserUserInput): Promise<CreateUserOutPut> {
    const email = Email.create(input.email);

    // Checking email, already taken or not
    const user = await this._userRepo.findByEmail(email);
    if (user && user.isVerified) {
      throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }

    const newUser = Advertiser.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      password: HashedPassword.create(input.password),
      companyName: input.companyName,
    });

    await this._userRepo.save(newUser);

    return { id: newUser.id, email: newUser.email };
  }
}
