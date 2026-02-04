import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { AuthCachedUserRepository } from '../ports';
import { CachedUser } from '../types/user-cache.types';
import { BadRequestError } from '@/shared/errors';
import { UserRepository } from '@/modules/user/application/ports';
import { Advertiser, User } from '@/modules/user/domain/entity';
import { GenderMapper } from '@/modules/user/infrastructure/mappers/user-gender.mapper';
import { OtpInput } from '../inputs';
import { UserRole } from '@/modules/user/domain/enums';

/*
  OTP verification
*/
export class OtpVerificationUseCase {
  constructor(
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _userRepo: UserRepository,
  ) {}

  async execute(input: OtpInput) {
    const email = Email.create(input.email);

    // Verifying OTP from cache DB.
    const cachedUser = await this._cachedUserRepo.get<CachedUser>(email);
    if (!cachedUser || cachedUser.otp !== input.otp) {
      throw new BadRequestError('OTP expired or invalid');
    }

    let user;

    if (cachedUser.role === UserRole.USER) {
      user = User.create({
        firstName: cachedUser.firstName,
        lastName: cachedUser.lastName,
        email: Email.create(cachedUser.email),
        password: HashedPassword.create(cachedUser.password),
        gender: GenderMapper.mapGender(cachedUser.gender),
        dob: cachedUser.dob,
      });
    } else {
      user = Advertiser.create({
        firstName: cachedUser.firstName,
        lastName: cachedUser.lastName,
        email: Email.create(cachedUser.email),
        password: HashedPassword.create(cachedUser.password),
        companyName: cachedUser.companyName,
        role: UserRole.ADVERTISER,
      });
    }

    await this._userRepo.save(user);

    // Delete user from cached DB, after registration.
    await this._cachedUserRepo.del(email);

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        email: email.getValue(),
      },
    };
  }
}
