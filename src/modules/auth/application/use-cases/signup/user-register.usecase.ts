import { RegisterInput } from '../../inputs';
import { BadRequestError } from '@/shared/errors';
import { PasswordHasher } from '../../ports/password-hasher';
import {
  Email,
  HashedPassword,
  Password,
} from '@/modules/user/domain/value-objects';
import { UserRepository } from '@/modules/user/application/ports';
import { Advertiser } from '@/modules/user/domain/entity/advertiser.entity';
import { User } from '@/modules/user/domain/entity/user.entity';
import { UserRole } from '@/modules/user/domain/enums';
import { GenderMapper } from '@/modules/user/infrastructure/mappers';
// import { OtpPurpose } from '../../../domain/enums';
import { GenerateOtpUseCase } from '../otp/generate-otp.usecase';
import { AgeRules } from '../../../domain/rules/age.rules';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

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
    private readonly _generateOtpUseCase: GenerateOtpUseCase,
    private readonly _userRepo: UserRepository,
    private readonly _passwordHaser: PasswordHasher,
  ) {}

  async execute(input: RegisterInput) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    // Checking if user already existing with the same email
    // const exstingUser = await this._userRepo.findByEmail(email);
    // if (exstingUser && exstingUser.getIsVerified()) {
    //   throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_EXIST);
    // }

    // Hashing user password
    const hashedPassword = await this._passwordHaser.hash(password);

    // Checking normal user age if dob provided and must be at least 12 years old
    if (input.role === UserRole.USER) {
      const isVlidAge = AgeRules.isValidAge(new Date(input.dob));
      if (!isVlidAge) {
        throw new BadRequestError(ERROR_MESSAGES.AGE_MUST_BE_12);
      }
    }

    let user: User | Advertiser;

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

    // Saving user in the database
    await this._userRepo.save(user);

    // Generate OTP for the registered user
    // const otpResult = await this._generateOtpUseCase.execute({
    //   email: input.email,
    //   purpose: OtpPurpose.REGISTRATION,
    // });

    return {
      status: 'success',
      message: 'User registered successfully, please verify your email',
      // data: { id: otpResult.data.id, purpose: otpResult.data.purpose },
    };
  }
}
