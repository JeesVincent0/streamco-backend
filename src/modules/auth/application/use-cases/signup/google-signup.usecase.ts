import {
  CreateUserWIthGoogleAuthPort,
  UserRepositoryPort,
} from '@/modules/user/application';
import { Email, UserRole } from '@/modules/user/domain';
import { TokenPayload } from '../../../domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { GoogleAuth } from '../../inputs';
import { TokenServicePort } from '@/modules/auth-security/application';

export class GoogleAuthUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _createUserWithGoogleAuth: CreateUserWIthGoogleAuthPort,
    private readonly _tokenService: TokenServicePort,
  ) {}
  async execute(input: GoogleAuth) {
    const email = Email.create(input.email);

    let user = await this._userRepo.findByEmail(email);
    if (!user) {
      if (input.intent === 'login') input.role = UserRole.USER;
      user = await this._createUserWithGoogleAuth.execute(input);
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
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
