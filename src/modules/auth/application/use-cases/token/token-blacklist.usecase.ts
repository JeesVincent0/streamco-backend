import { TOKEN_TYPE } from '@/modules/auth/domain';
import { BaseCachedUserRepositoryPort } from '../../ports';
import {
  VerifiedAccessTokenPayload,
  VerifiedRefreshTokenPayload,
  VerifiedResetPasswordTokenPayload,
} from '@/shared/interfaces/token-type';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { TokenServicePort } from '@/modules/auth-security/application';

export class TokenBlackListUseCase {
  constructor(
    private readonly _tokenBlacklistRepo: BaseCachedUserRepositoryPort,
    private readonly _tokenService: TokenServicePort,
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
      throw new UnauthorizedException(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    const { jti, exp } = payload;

    const currentTime = Math.floor(Date.now() / 1000);
    const ttl = exp - currentTime;

    if (ttl <= 0) {
      return;
    }

    await this._tokenBlacklistRepo.save(jti, 'blacklisted', ttl);
  }
}
