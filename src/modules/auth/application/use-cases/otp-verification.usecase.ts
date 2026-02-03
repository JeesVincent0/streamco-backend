import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { OtpDto } from '../dto';
import { AuthCachedUserRepository } from '../ports';
import { CachedUser } from '../types/user-cache.types';
import { BadRequestError } from '@/shared/errors';
import { UserRepository } from '@/modules/user/application/ports';
import { User } from '@/modules/user/domain/entity';
import { GenderMapper } from '@/modules/user/infrastructure/mappers/user-gender.mapper';

/*
  OTP verification
*/
export class OtpVerificationUseCase {
  constructor(
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _userRepo: UserRepository,
  ) {}

  async execute(input: OtpDto) {
    const email = Email.create(input.email);

    // Verifying OTP from cache DB.
    const cachedUser = await this._cachedUserRepo.get<CachedUser>(email);
    if (!cachedUser || cachedUser.otp !== input.otp) {
      throw new BadRequestError('OTP expired or invalid');
    }

    // Creating new User Object
    const user = User.create({
      firstName: cachedUser.firstName,
      lastName: cachedUser.lastName,
      email: Email.create(cachedUser.email),
      password: HashedPassword.create(cachedUser.password),
      gender: GenderMapper.mapGender(cachedUser.gender),
      dob: cachedUser.dob,
    });

    await this._userRepo.save(user);

    // Delete user from cached DB, after registration.
    await this._cachedUserRepo.del(email);
    const sample = await this._cachedUserRepo.get<CachedUser>(email);
    console.log(sample);

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        email: user.getEmail(),
      },
    };
  }
}
