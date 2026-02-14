import { CreateNormalUserInput } from '../../inputs';
import { CreateUserOutPut } from '../../output';
import { CreateNormalUserPort, UserRepositoryPort } from '../../ports';
import { Email, HashedPassword, User } from '@/modules/user/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { BadRequestError } from '@/shared/errors';
import { Gender } from '@/modules/user/domain/value-objects/gender.vo';
import { AgeRules } from '@/modules/auth/domain/rules/age.rules';

export class CreateNormalUserUseCase implements CreateNormalUserPort {
  constructor(private _userRepo: UserRepositoryPort) {}
  async execute(input: CreateNormalUserInput): Promise<CreateUserOutPut> {
    const email = Email.create(input.email);

    // Checking email, already taken or not
    const user = await this._userRepo.findByEmail(email);
    if (user && user.isVerified) {
      throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }

    // Checking normal user age valid or not
    AgeRules.isValidAge(input.dob);

    const newUser = User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      password: HashedPassword.create(input.password),
      gender: Gender.create(input.gender),
      dob: input.dob,
    });

    await this._userRepo.save(newUser);

    return { id: newUser.id, email: newUser.email };
  }
}
