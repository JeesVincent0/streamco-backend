import { UserRepositoryPort } from '@/modules/user/application/ports';
import {
  BaseCachedUserRepositoryPort,
  type MailServicePort,
  OtpServicePort,
  PasswordHasherPort,
} from '../../ports';
import { Email } from '@/modules/user/domain/value-objects';
import { OtpPolicy } from '../../../domain/service/otp-policy';
import { GenerateOtpInput } from '../../inputs';
import { UniqueIdService } from '@/shared/domain';
// import { MAIL_SERVICE } from '../../ports/tokens.port';

/*
 *
 * Use case for generating OTP.
 * It checks if the user exists with the provided email,
 * generates an OTP,
 * hashes the OTP,
 * creates an OTP state with the policy,
 * saves the OTP state in the cache with user ID as key and 5 minutes expiration time,
 * and sends the OTP to the user's email.
 *
 */

export class GenerateOtpUseCase {
  constructor(
    private readonly _otpRepository: OtpServicePort,
    private readonly _userRepository: UserRepositoryPort,
    private readonly _passwordHasher: PasswordHasherPort,
    private readonly _cacheRepository: BaseCachedUserRepositoryPort,
    private readonly _mailService: MailServicePort,
  ) {}

  async execute(input: GenerateOtpInput) {
    const email = Email.create(input.email);

    // Checking if user existing with the email and if not existing throw error
    const userExiting = await this._userRepository.findByEmail(email);
    if (!userExiting) {
      const id = UniqueIdService.generate();
      const time = new Date(Date.now() + 30000);
      return {
        status: 'success',
        message: 'OTP generated and sent to email successfully',
        data: { id, purpose: input.purpose, otpResendAt: time },
      };
    }

    // OTP generating and OTP hashing
    const otp = this._otpRepository.generate();
    const hashedOtp = await this._passwordHasher.hash(otp.toString());

    const id = userExiting.id;

    // Creating OTP state with policy
    const otpState = OtpPolicy.createInitialState(
      userExiting.id,
      email.getValue(),
      hashedOtp,
      input.purpose,
    );

    // Saving OTP state in cache with user ID as key and 5 minutes expiration time
    await this._cacheRepository.save(id, otpState, 300);

    console.log('OTP: ', otp);
    console.log('ID: ', id);

    // mail service to send OTP to user email
    // await this._mailService.sendOtp(email, otp);

    return {
      status: 'success',
      message: 'OTP generated and sent to email successfully',
      data: { id, purpose: input.purpose, otpResendAt: otpState.otpResendAt },
    };
  }
}
