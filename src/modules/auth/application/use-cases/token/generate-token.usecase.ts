import { TokenServicePort } from '@/modules/auth-security/application';
import { RefreshTokenUseCase } from './refresh-token.usecase';
import { AccessTokenPayload, RefreshTokenPayload } from '@/shared/interfaces';
import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

/*
 * GenerateTokenUseCase will create access token and refresh token,
 * then save the refresh token to database.
 */

export class GenerateTokenUseCase {
  constructor(
    private readonly _tokenService: TokenServicePort,
    private readonly _refreshTokenUseCase: RefreshTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(
    accessTokenPayload: AccessTokenPayload,
    refreshTokenPayload: RefreshTokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken =
      await this._tokenService.generateAccessToken(accessTokenPayload);
    const refreshToken =
      await this._tokenService.generateRefreshToken(refreshTokenPayload);

    await this._refreshTokenUseCase.execute(
      refreshToken,
      RefreshTokenPurpose.CREATE,
    );

    this._logger.log({
      event: LOG_EVENTS.TOKENS_CREATED,
      context: 'GenerateTokenUseCase',
      userId: refreshTokenPayload.sub,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
