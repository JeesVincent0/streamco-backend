import {
  Advertiser,
  BaseUser,
  Email,
  User,
  UserRole,
} from '@/modules/user/domain';
import { IGoogleAuthInput } from '../../inputs';
import { UserRepositoryPort } from '../../ports';

export class CreateUserWithGoogleAuthUseCase {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async execute(input: IGoogleAuthInput): Promise<BaseUser> {
    const email = Email.create(input.email);
    let user;
    if (input.role === UserRole.ADVERTISER) {
      user = Advertiser.create({
        firstName: input.firstName,
        lastName: input.lastName,
        displayName: input.displayName,
        email,
        googleId: input.googleId,
        isProfileCompleted: false,
        isVerified: true,
      });
    } else if (input.role === UserRole.USER) {
      user = User.create({
        firstName: input.firstName,
        lastName: input.lastName,
        displayName: input.displayName,
        googleId: input.googleId,
        email,
        isProfileCompleted: false,
        isVerified: true,
      });
    }

    await this._userRepo.save(user);
    return user as BaseUser;
  }
}
