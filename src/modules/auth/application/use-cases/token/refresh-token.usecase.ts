import { TokenServicePort } from '@/modules/auth-security/application';
import { RefreshTokenPort } from '../../ports/token';
import { RefreshToken } from '@/modules/auth/domain/entity';
import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

/*
 * RefreshTokenUseCase will handle the logic of creating and revoking refresh token.
 */

export class RefreshTokenUseCase {
  constructor(
    private readonly _refreshTokenRepository: RefreshTokenPort,
    private readonly _tokenService: TokenServicePort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(token: string, purpose: RefreshTokenPurpose): Promise<void> {
    const payload = await this._tokenService.verifyRefreshToken(token);
    if (!payload) return;

    const refreshTokenDoc = await this._refreshTokenRepository.findByJti(
      payload.jti,
    );

    const tokenEntity = RefreshToken.create(
      payload.sub,
      payload.jti,
      false,
      new Date(payload.iat * 1000),
      new Date(payload.exp * 1000),
    );

    if (!refreshTokenDoc && purpose === RefreshTokenPurpose.CREATE) {
      await this._refreshTokenRepository.save(tokenEntity);
      this._logger.log({
        event: LOG_EVENTS.REFRESH_TOKEN_ADDED_TO_DB,
        context: 'RefreshTokenUseCase',
        userId: payload.sub,
      });
      return;
    }

    if (refreshTokenDoc && purpose === RefreshTokenPurpose.REVOKE) {
      await this._refreshTokenRepository.revokeToken(refreshTokenDoc.jti);
      this._logger.log({
        event: LOG_EVENTS.REFRESH_TOKEN_REVOKED,
        context: 'RefreshTokenUseCase',
        userId: payload.sub,
      });
      return;
    }

    return;
  }
}
