import { BadRequestError } from '@/shared/errors';
import { AuthCachedUserRepositoryPort, PasswordHasherPort } from '../../ports';
import { OtpPolicy, OtpSate } from '@/modules/auth/domain/service/otp-policy';
import { VerifyOtpInput } from '../../inputs';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

/*
 * Use case for OTP verification.
 * It checks if the OTP is valid or not, if not valid consume one attempt and check if attempts are exhausted or not,
 * if exhausted that means user need to resend OTP again, so delete the cache and throw error, if not exhausted save the updated attempt in cache and throw error.
 * If OTP valid delete the cache and return email and purpose for next step in registration or forgot password process.
 */

export class VerifyOtpUseCase {
  constructor(
    private readonly _cacheRepository: AuthCachedUserRepositoryPort,
    private readonly _otpHasher: PasswordHasherPort,
  ) {}

  async execute(input: VerifyOtpInput) {
    // Checking user from cache DB, if not found that means session expired.
    const cachedUser = await this._cacheRepository.get<OtpSate>(input.id);
    if (!cachedUser) {
      throw new BadRequestError('Session expired', {
        cachedUser: false,
      });
    }

    // Verifing the purpose
    if (cachedUser.purpose !== input.purpose) {
      throw new BadRequestError(ERROR_MESSAGES.INVALID_OTP_PURPOSE);
    }

    // Checking OTP qual or not
    const isValidOtp = await this._otpHasher.compare(
      input.otp,
      cachedUser.hashedOtp,
    );

    if (!isValidOtp) {
      // Consume one attempt and check if attempts are exhausted or not
      const updateOtpState = OtpPolicy.consumeAttempt(cachedUser);
      if (OtpPolicy.isExhausted(updateOtpState)) {
        // Delete the cache and throw error
        await this._cacheRepository.del(input.id);
        throw new BadRequestError(
          'Too many attempts, try again after sometimes',
        );
      }

      //   Save the updated attempt in cache and throw error
      await this._cacheRepository.save(input.id, updateOtpState, 300);
      throw new BadRequestError('OTP expired or invalid');
    }

    // If OTP valid delete the cache and return email and purpose for next step in registration or forgot password process.
    await this._cacheRepository.del(input.id);

    return { email: cachedUser.email, purpose: cachedUser.purpose };
  }
}
