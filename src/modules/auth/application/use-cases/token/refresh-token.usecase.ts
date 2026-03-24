import { TokenServicePort } from '@/modules/auth-security/application';
import { RefreshTokenPort } from '../../ports/token';
import { RefreshToken } from '@/modules/auth/domain/entity';
import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IRefreshTokenUseCase } from '../../ports';

/*
 * RefreshTokenUseCase will handle the logic of creating and revoking refresh token.
 */

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _refreshTokenRepository: RefreshTokenPort,
    private readonly _tokenService: TokenServicePort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(token: string, purpose: RefreshTokenPurpose): Promise<void> {
    if (purpose === RefreshTokenPurpose.CREATE) {
      const payload = await this._tokenService.verifyRefreshToken(token);
      if (!payload) return;
      const refreshTokenDoc = await this._refreshTokenRepository.findByJti(
        payload.jti,
      );

      if (refreshTokenDoc) return;
      const tokenEntity = RefreshToken.create(
        payload.sub,
        payload.jti,
        false,
        new Date(payload.iat * 1000),
        new Date(payload.exp * 1000),
      );
      await this._refreshTokenRepository.save(tokenEntity);
      this._logger.log({
        event: LOG_EVENTS.REFRESH_TOKEN_ADDED_TO_DB,
        context: 'RefreshTokenUseCase',
        userId: payload.sub,
      });
      return;
    }

    if (purpose === RefreshTokenPurpose.REVOKE) {
      await this._refreshTokenRepository.revokeAllTokenByUserId(token);
      this._logger.log({
        event: LOG_EVENTS.REFRESH_TOKEN_REVOKED,
        context: 'RefreshTokenUseCase',
        userId: token,
      });
      return;
    }

    return;
  }
}
