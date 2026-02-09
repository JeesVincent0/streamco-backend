import { UserRepository } from '@/modules/user/application/ports';
import {
  AuthCachedUserRepository,
  MailService,
  OtpService,
  PasswordHasher,
} from '../ports';
import { Email } from '@/modules/user/domain/value-objects';
import { OtpPolicy } from '../../domain/service/otp-policy';
import { GenerateOtpInput } from '../inputs';
import { BadRequestError } from '@/shared/errors';

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
    private readonly _otpRepository: OtpService,
    private readonly _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _cacheRepository: AuthCachedUserRepository,
    private readonly _mailService: MailService,
  ) {}

  async execute(input: GenerateOtpInput) {
    console.log('Executing GenerateOtpUseCase with input:', input);
    const email = Email.create(input.email);

    // Checking if user existing with the email and if not existing throw error
    const userExiting = await this._userRepository.findByEmail(email);
    if (!userExiting) {
      throw new BadRequestError('Wrong email ID');
    }

    // OTP generating and OTP hashing
    const otp = this._otpRepository.generate();
    const hashedOtp = await this._passwordHasher.hash(otp.toString());

    const id = userExiting.getId();

    // Creating OTP state with policy
    const otpStat = OtpPolicy.createInitialState(
      userExiting.getId(),
      email.getValue(),
      hashedOtp,
      input.purpose,
    );

    // Saving OTP state in cache with user ID as key and 5 minutes expiration time
    await this._cacheRepository.save(id, otpStat, 300);

    console.log('OTP: ', otp);
    console.log('ID: ', id);

    // mail service to send OTP to user email
    await this._mailService.sendOtp(email, otp);

    return {
      status: 'success',
      message: 'OTP generated and sent to email successfully',
      data: { id, purpose: input.purpose },
    };
  }
}
