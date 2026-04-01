// This is where the logic for refreshing the access token will go.
// It will involve validating the refresh token, generating a new access token,
// and returning it to the client.

import { UserRole } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { TokenPayload } from '@/modules/auth/domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { UserRepositoryPort } from '@/modules/user/application';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { TokenServicePort } from '@/modules/auth-security/application';
import { IRefreshAccessTokenUseCase } from '../../ports';

export class RefreshAccessTokenUseCase implements IRefreshAccessTokenUseCase {
  constructor(
    private readonly _tokenService: TokenServicePort,
    private readonly _userRepo: UserRepositoryPort,
  ) {}
  async execute(userId: string) {
    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const accessTokenPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${user.role !== UserRole.ADMIN ? `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}` : `${SCOPE.ADMIN_READ} ${SCOPE.ADMIN_WRITE} ${SCOPE.USER_READ}`}`,
    );
    const accessToken =
      await this._tokenService.generateAccessToken(accessTokenPayload);
    return accessToken;
  }
}
