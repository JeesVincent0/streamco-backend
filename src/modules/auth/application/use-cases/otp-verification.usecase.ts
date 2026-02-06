import { Email } from '@/modules/user/domain/value-objects';
import { AuthCachedUserRepository } from '../ports';
import { CachedUser } from '../types/user-cache.types';
import { BadRequestError } from '@/shared/errors';
import { UserRepository } from '@/modules/user/application/ports';
import { OtpInput } from '../inputs';

/*
  OTP verification
*/
export class OtpVerificationUseCase {
  constructor(
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _userRepo: UserRepository,
  ) {}

  async execute(input: OtpInput) {
    const id = input.id;

    // Verifying OTP from cache DB.
    const cachedUser = await this._cachedUserRepo.get<CachedUser>(id);
    if (!cachedUser || cachedUser.otp !== input.otp) {
      throw new BadRequestError('OTP expired or invalid');
    }

    const email = Email.create(cachedUser.email);

    // Delete user from cached DB, after registration.
    // await this._cachedUserRepo.del(id);

    const user = await this._userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    user.verify();

    await this._userRepo.save(user);

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        email: email.getValue(),
      },
    };
  }
}
