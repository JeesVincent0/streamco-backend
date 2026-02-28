import {
  CreateUserWIthGoogleAuthPort,
  UserRepositoryPort,
} from '@/modules/user/application';
import { Email, UserRole } from '@/modules/user/domain';
import { IGoogleAuth } from '../../inputs/signup/google-auth.input';
import { TokenPayload } from '../../../domain';
import { TokenServicePort } from '@/modules/auth-security/application';

export class GoogleAuthUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _createUserWithGoogleAuth: CreateUserWIthGoogleAuthPort,
    private readonly _tokenService: TokenServicePort,
  ) {}
  async execute(input: IGoogleAuth) {
    const email = Email.create(input.email);

    let user = await this._userRepo.findByEmail(email);
    if (!user) {
      if (input.intent === 'login') input.role = UserRole.USER;
      user = await this._createUserWithGoogleAuth.execute(input);
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${user?.role}:read ${user?.role}:write`,
    );
    const refreshPayload = TokenPayload.generateRefreshPayload(user.id);

    const accessToken =
      await this._tokenService.generateAccessToken(accessPayload);
    const refreshToken =
      await this._tokenService.generateRefreshToken(refreshPayload);

    return {
      accessToken,
      refreshToken,
      role: user.role,
      name: user.displayName,
    };
  }
}
