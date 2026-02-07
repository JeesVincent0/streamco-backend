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
import { IdGenerator } from '../ports';
import { OtpPolicy } from '../../domain/service/otp-policy';

/*
 *
 * Use case for user registration.
 * It checks if the user already exists,
 * hashes the password,
 * checks the age if dob provided,
 * saves the user, generates an OTP,
 * saves it in the cache,
 * and sends it to the user's email.
 *
 */

export class RegisterUserUseCase {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly _passwordHaser: PasswordHasher,
    private readonly _otpService: OtpService,
    private readonly _mailService: MailService,
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _randomIdGenerator: IdGenerator,
    private readonly _logger: FileLogger,
  ) {}

  async execute(input: RegisterInput) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    // Checking if user already existing with the same email
    const exstingUser = await this._userRepo.findByEmail(email);
    if (exstingUser && exstingUser.getIsVerified()) {
      throw new BadRequestError('User already existing');
    }

    // Hashing user password
    const hashedPassword = await this._passwordHaser.hash(password);

    // Checking user age if dob provided and must be at least 12 years old
    if (
      'dob' in input &&
      input.dob &&
      new Date(input.dob) >
        new Date(new Date().setFullYear(new Date().getFullYear() - 12))
    ) {
      throw new BadRequestError('Age must be at least 12 years old');
    }

    let user;

    // Creating user based on the role and saving it in the database
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

    console.log(user);

    // Saving user in the database
    await this._userRepo.save(user);

    // OTP generating and OTP hashing
    const otp = this._otpService.generate();
    const hashedOtp = await this._passwordHaser.hash(otp);

    // Credentials save in the cache DB
    const id = this._randomIdGenerator.generate();
    const otpState = OtpPolicy.createInitialState(
      id,
      email.getValue(),
      hashedOtp,
    );
    await this._cachedUserRepo.save(id, otpState, 300);

    this._logger.debug({
      message: 'User data saved in the cache',
      data: await this._cachedUserRepo.get(id),
    });

    this._logger.debug({ id, email: email.getValue(), otp });

    // OTP send to user email
    // await this._mailService.sendOtp(email, otp);

    return {
      status: 'success',
      message: 'User registered successfully, please verify your email',
      data: { id },
    };
  }
}
