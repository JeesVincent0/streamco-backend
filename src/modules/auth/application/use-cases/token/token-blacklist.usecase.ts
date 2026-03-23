import { TOKEN_TYPE } from '@/modules/auth/domain';
import {
  VerifiedAccessTokenPayload,
  VerifiedRefreshTokenPayload,
  VerifiedResetPasswordTokenPayload,
} from '@/shared/interfaces/token-type';
import { TokenServicePort } from '@/modules/auth-security/application';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { ICacheBaseRepo } from '@/shared/application/ports';

/*
  This use case is responsible for blacklisting tokens. 
  It takes a token and its type as input, verifies the 
  token, and if valid, extracts the jti (JWT ID) and 
  expiration time from the token payload. It then 
  calculates the time-to-live (TTL) for the token and 
  saves it in the blacklist repository with the jti as the 
  key and 'blacklisted' as the value. The logger is used to 
  log the event of token blacklisting.
*/

export class TokenBlackListUseCase {
  constructor(
    private readonly _tokenBlacklistRepo: ICacheBaseRepo,
    private readonly _tokenService: TokenServicePort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(token: string, type: TOKEN_TYPE) {
    let payload:
      | VerifiedAccessTokenPayload
      | VerifiedRefreshTokenPayload
      | VerifiedResetPasswordTokenPayload;

    if (type === TOKEN_TYPE.RESET_PASSWORD_TOKEN) {
      payload = await this._tokenService.verifyResetPassword(token);
    } else if (type === TOKEN_TYPE.ACCESS_TOKEN) {
      payload = await this._tokenService.verifyAccessToken(token);
    } else if (type === TOKEN_TYPE.REFRESH_TOKEN) {
      payload = await this._tokenService.verifyRefreshToken(token);
    } else {
      return;
    }

    const { jti, exp } = payload;

    const currentTime = Math.floor(Date.now() / 1000);
    const ttl = exp - currentTime;

    if (ttl <= 0) {
      return;
    }

    this._logger.log({
      event: LOG_EVENTS.TOKEN_BLACKLISTED,
      context: 'TokenBlackListUseCase',
      userId: payload.sub,
      tokenType: type,
    });

    await this._tokenBlacklistRepo.save(jti, 'blacklisted', ttl);
  }
}
