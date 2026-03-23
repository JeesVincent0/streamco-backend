import { BadRequestError } from '@/shared/errors';
import { IPasswordHasher } from '../../ports';
import { OtpPolicy, OtpState } from '@/shared/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { ICacheBaseRepo } from '@/shared/application/ports';
import { VerifyOtpInput } from '@/shared/application/input';
import { VerifyOtpUseCaseOutput } from '../../output';
import { IVerifyOtpUseCase } from '../../ports/usecase/verify-otp.usecase.port';

/*
 * Use case for OTP verification.
 * It checks if the OTP is valid or not, if not valid consume one attempt and check if attempts are exhausted or not,
 * if exhausted that means user need to resend OTP again, so delete the cache and throw error, if not exhausted save the updated attempt in cache and throw error.
 * If OTP valid delete the cache and return email and purpose for next step in registration or forgot password process.
 */

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private readonly _cacheRepository: ICacheBaseRepo,
    private readonly _otpHasher: IPasswordHasher,
  ) {}

  async execute(input: VerifyOtpInput): Promise<VerifyOtpUseCaseOutput> {
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
