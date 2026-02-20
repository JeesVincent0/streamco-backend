import { VerifyPassword } from '@/modules/auth/domain';
import { ResetPasswordInput } from '../../inputs/reset-password/reset-password.input';
import { UserRepositoryPort } from '@/modules/user/application';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { PasswordHasherPort } from '../../ports';
import { HashedPassword } from '@/modules/user/domain';

export class ResetPasswordUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _passwordHasher: PasswordHasherPort,
  ) {}
  async execute(input: ResetPasswordInput) {
    const { password } = VerifyPassword.verify({
      password: input.password,
      confirmPassword: input.confirmPassword,
    });

    const user = await this._userRepo.findById(input.id);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.MISSING_TOKEN);
    }

    const hashedPassword = await this._passwordHasher.hash(password);

    user.changePassword(HashedPassword.create(hashedPassword));

    await this._userRepo.save(user);

    return {
      status: 'success',
      message: 'Password changed successfully',
    };
  }
}
