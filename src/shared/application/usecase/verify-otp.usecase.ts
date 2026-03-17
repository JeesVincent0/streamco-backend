import { OtpPurpose } from '@/modules/auth/domain';
import { VerifyOtpInput } from '../input';
import {
  CacheBaseRepoPort,
  passwordHasherPort,
  VerifyOtpInterface,
} from '../ports';
import { OtpPolicy, OtpState } from '@/shared/domain';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class VerifyOtpUseCase implements VerifyOtpInterface {
  constructor(
    private readonly _cacheRepository: CacheBaseRepoPort,
    private readonly _otpHasher: passwordHasherPort,
  ) {}
  async execute(
    input: VerifyOtpInput,
  ): Promise<{ email: string; purpose: OtpPurpose }> {
    // Checking user from cache DB, if not found that means session expired.
    const cachedUser = await this._cacheRepository.get<OtpState>(input.id);
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
        throw new BadRequestError(ERROR_MESSAGES.SESSION_EXPIRED);
      }

      //   Save the updated attempt in cache and throw error
      await this._cacheRepository.save(input.id, updateOtpState, 300);
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    // If OTP valid delete the cache and return email and purpose for next step in registration or forgot password process.
    await this._cacheRepository.del(input.id);

    return { email: cachedUser.email, purpose: cachedUser.purpose };
  }
}
