import { Email } from '@/modules/user/domain/value-objects';
import { AuthCachedUserRepository, PasswordHasher } from '../ports';
import { BadRequestError } from '@/shared/errors';
import { UserRepository } from '@/modules/user/application/ports';
import { OtpInput } from '../inputs';
import { OtpPolicy, OtpSate } from '../../domain/service/otp-policy';

/*
  OTP verification
*/
export class OtpVerificationUseCase {
  constructor(
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _userRepo: UserRepository,
    private readonly _otpHasher: PasswordHasher,
  ) {}

  async execute(input: OtpInput) {
    const id = input.id;

    // Verifying OTP from cache DB.
    const cachedUser = await this._cachedUserRepo.get<OtpSate>(id);
    if (!cachedUser) {
      throw new BadRequestError<{ cachedUser: boolean }>(
        'OTP expired or invalid',
        {
          cachedUser: false,
        },
      );
    }

    const isOtpValid = await this._otpHasher.compare(
      input.otp.toString(),
      cachedUser.hashedOtp,
    );

    if (!isOtpValid) {
      const updateOtpState = OtpPolicy.consumeAttempt(cachedUser);
      if (OtpPolicy.isExhausted(updateOtpState)) {
        await this._cachedUserRepo.del(input.id);
        throw new BadRequestError(
          'Too many attempts, try again after sometimes',
          {
            cachedUser: false,
            manyAttemts: true,
          },
        );
      }

      await this._cachedUserRepo.save(input.id, updateOtpState, 300);
      throw new BadRequestError('OTP expired or invalid', {
        cachedUser: true,
      });
    }

    const email = Email.create(cachedUser.email);

    // Delete user from cached DB, after registration.
    await this._cachedUserRepo.del(id);

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
