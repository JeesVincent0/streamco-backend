import { Email } from '@/modules/user/domain/value-objects';
import { SigninInput } from '../inputs';
import { UserRepository } from '@/modules/user/application/ports';
import { BadRequestError } from '@/shared/errors';
import { PasswordHasher } from '../ports';
import { ResponseData } from '../../domain/service/signin-reposnse';

export class SigninUseCase {
  constructor(
    private _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
  ) {}

  async execute(input: SigninInput) {
    const email = Email.create(input.email);

    const existingUser = await this._userRepository.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestError('Wrong email ID');
    }

    if (!existingUser.getIsVerified()) {
      throw new BadRequestError('User not verified, please verify', {
        isVerified: false,
      });
    }

    const isPasswordMatch = await this._passwordHasher.compare(
      input.password,
      existingUser.getPassword().getValue(),
    );

    if (!isPasswordMatch) {
      console.log('this isisis');
      throw new BadRequestError('Wrong password');
    }

    const responseData = ResponseData.getDate(
      existingUser.getId(),
      existingUser.getDisplayName(),
      existingUser.getEmail(),
      existingUser.getRole(),
    );

    return {
      status: 'success',
      message: 'User successfully signined',
      data: responseData,
    };
  }
}
