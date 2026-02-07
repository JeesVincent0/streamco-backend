import { BadRequestError } from '@/shared/errors';

export class UserVerificationRule {
  static isUserVerified(status: boolean): void {
    if (!status) throw new BadRequestError('User not verified, please verify');
  }
}
