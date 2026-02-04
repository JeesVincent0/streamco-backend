import { RegisterInput } from '../inputs';
import { OtpService } from '../ports/otp-service';
import { BadRequestError } from '@/shared/errors';
import { MailService } from '../ports/mail-sevice';
import { FileLogger } from '@/shared/logger/file-logger';
import { PasswordHasher } from '../ports/password-hasher';
import { Email, Password } from '@/modules/user/domain/value-objects';
import { AuthCachedUserRepository } from '../ports/user-cache-repository';
import { UserRepository } from '@/modules/user/application/ports/user-repository';

/*
 *
 * Initializing user registration
 * OTP and basic details saved in the cache for verification
 * OTP send to the email
 *
 */

export class RegisterUserUseCase {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly _passwordHaser: PasswordHasher,
    private readonly _otpService: OtpService,
    private readonly _mailService: MailService,
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _logger: FileLogger,
  ) {}

  async execute(input: RegisterInput) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    // Checking user email in the cache DB
    const cachedUser = await this._cachedUserRepo.get(email);
    if (cachedUser) {
      throw new BadRequestError('OTP already send, please verify');
    }

    // Checking user email in the DB
    const exstingUser = await this._userRepo.findByEmail(email);
    if (exstingUser) {
      throw new BadRequestError('User already existing');
    }

    // Password hashing
    const hashedPassword = await this._passwordHaser.hash(password);
    input.password = hashedPassword;

    // OTP generating and saving in the cache.
    const otp = this._otpService.generate();
    await this._cachedUserRepo.save(
      email,
      {
        ...input,
        otp,
      },
      300,
    );
    this._logger.debug({ email, otp });

    // OTP send to user email
    await this._mailService.sendOtp(email, otp);
  }
}
