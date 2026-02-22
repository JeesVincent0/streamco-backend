import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { SigninInput } from '../../inputs';
import { UserRepositoryPort } from '@/modules/user/application';
import { BadRequestError } from '@/shared/errors';
import { PasswordHasherPort } from '../../ports';
import { ResponseData } from '../../../domain/service/signin-reposnse';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class SigninUseCase {
  constructor(
    private _userRepository: UserRepositoryPort,
    private readonly _passwordHasher: PasswordHasherPort,
  ) {}

  async execute(input: SigninInput) {
    const email = Email.create(input.email);

    const existingUser = await this._userRepository.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    if (!existingUser.password?.getValue()) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    } else {
      HashedPassword.create(existingUser.password?.getValue());
    }
    existingUser.assertCanSignin();

    const isPasswordMatch = await this._passwordHasher.compare(
      input.password,
      existingUser.password.getValue(),
    );

    if (!isPasswordMatch) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    const responseData = ResponseData.getDate(
      existingUser.id,
      existingUser.displayName,
      existingUser.email,
      existingUser.role,
    );

    return {
      status: 'success',
      message: 'User successfully signined',
      data: responseData,
    };
  }
}
