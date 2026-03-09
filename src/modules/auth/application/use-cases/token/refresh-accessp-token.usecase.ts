// This is where the logic for refreshing the access token will go.
// It will involve validating the refresh token, generating a new access token,
// and returning it to the client.

import { TokenServicePort } from '@/modules/auth-security/application';
import { SCOPE } from '@/modules/auth-security/domain';
import { TokenPayload } from '@/modules/auth/domain';
import { UserRepositoryPort } from '@/modules/user/application';
import { UserRole } from '@/modules/user/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { BadRequestError } from '@/shared/errors';
import { FileLogger } from '@/shared/logger/file-logger';

export class RefreshAccessTokenUseCase {
  constructor(
    private readonly _tokenService: TokenServicePort,
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: FileLogger,
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
