import { IRefreshTokenUseCase } from '../../ports';
import { ILogger } from '@/shared/logger/logger.interface';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { TokenServicePort } from '@/modules/auth-security/application';
import { AccessTokenPayload, RefreshTokenPayload } from '@/shared/interfaces';
import { IGenerateTokenUseCase } from '../../ports/usecase/generate-token.usecase.port';
import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';

/*
 * GenerateTokenUseCase will create access token and refresh token,
 * then save the refresh token to database.
 */

export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    private readonly _tokenService: TokenServicePort,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _logger: ILogger,
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
