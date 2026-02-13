import { CreateNormalUserInput } from '../../inputs';
// import { CreateUserOutPut } from '../../output';
import { CreateNormalUserPort, UserRepositoryPort } from '../../ports';
import { Email, HashedPassword, Password, User } from '@/modules/user/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { BadRequestError } from '@/shared/errors';
import { GenderMapper } from '@/modules/user/infrastructure/mappers';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { PasswordHasherPort } from '../../ports/security/password-hasher-port';

export class CreateNormalUserUseCase implements CreateNormalUserPort {
  constructor(
    private _userRepo: UserRepositoryPort,
    private readonly _passwordHasher: PasswordHasherPort,
  ) {}
  async execute(input: CreateNormalUserInput) {
    const email = Email.create(input.email);

    // Checking email, already taken or not
    const user = await this._userRepo.findByEmail(email);
    if (user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }

    // Password hashing
    const password = Password.create(input.password);
    const hashedPassword = await this._passwordHasher.hash(password);

    const newUser = User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      password: HashedPassword.create(hashedPassword),
      gender: GenderMapper.mapGender(input.gender),
      dob: input.dob,
    });

    await this._userRepo.save(newUser);

    return {
      status: 'success',
      message: 'User registered successfully, please verify email',
      data: {
        id: newUser.id,
        purpose: OtpPurpose.REGISTRATION,
      },
    };
  }
}
