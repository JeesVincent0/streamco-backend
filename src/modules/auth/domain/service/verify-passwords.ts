import { Password } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class VerifyPassword {
  static verify(passwords: { password: string; confirmPassword: string }) {
    const password = Password.create(passwords.password);
    const confirmPassword = Password.create(passwords.confirmPassword);

    if (password.getValue() !== confirmPassword.getValue()) {
      throw new BadRequestError(ERROR_MESSAGES.PASSWORD_NOT_MATCHING);
    }

    return { password };
  }
}
