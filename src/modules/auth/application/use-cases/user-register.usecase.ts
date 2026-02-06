import { RegisterInput } from '../inputs';
import { OtpService } from '../ports/otp-service';
import { BadRequestError } from '@/shared/errors';
import { MailService } from '../ports/mail-sevice';
import { FileLogger } from '@/shared/logger/file-logger';
import { PasswordHasher } from '../ports/password-hasher';
import {
  Email,
  HashedPassword,
  Password,
} from '@/modules/user/domain/value-objects';
import { AuthCachedUserRepository } from '../ports/user-cache-repository';
import { UserRepository } from '@/modules/user/application/ports/user-repository';
import { Advertiser } from '@/modules/user/domain/entity/advertiser.entity';
import { User } from '@/modules/user/domain/entity/user.entity';
import { UserRole } from '@/modules/user/domain/enums';
import { GenderMapper } from '@/modules/user/infrastructure/mappers';

/*
 *
 * User registration use case
 *
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

    // Checking user email in the DB
    const exstingUser = await this._userRepo.findByEmail(email);
    if (exstingUser) {
      throw new BadRequestError('User already existing');
    }

    // Password hashing
    const hashedPassword = await this._passwordHaser.hash(password);
    input.password = hashedPassword;

    if (
      'dob' in input &&
      input.dob &&
      new Date(input.dob) >
        new Date(new Date().setFullYear(new Date().getFullYear() - 12))
    ) {
      throw new BadRequestError('Age must be at least 12 years old');
    }

    let user;

    if (input.role === UserRole.USER) {
      user = User.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email,
        password: HashedPassword.create(hashedPassword),
        gender: GenderMapper.mapGender(input.gender),
        dob: input.dob,
      });
    } else {
      user = Advertiser.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email,
        password: HashedPassword.create(hashedPassword),
        companyName: input.companyName,
        role: UserRole.ADVERTISER,
      });
    }

    await this._userRepo.save(user);

    // OTP generating and saving in the cache.
    const otp = this._otpService.generate();
    const id = crypto.randomUUID();
    await this._cachedUserRepo.save(
      id,
      {
        ...input,
        otp,
      },
      300,
    );
    this._logger.debug({ id, email, otp });

    // OTP send to user email
    await this._mailService.sendOtp(email, otp);
  }
}
