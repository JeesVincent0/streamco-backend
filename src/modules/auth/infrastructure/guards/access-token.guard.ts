import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  TOKEN_BLACK_LIST_CACHE,
  TOKEN_SERVICE,
  type TokenServicePort,
  type BaseCachedUserRepositoryPort,
} from '../../application';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { UnauthorizedError } from '@/shared/errors';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_BLACK_LIST_CACHE)
    private readonly _tokenBlacklistRepo: BaseCachedUserRepositoryPort,
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookie = request.cookies as Record<string, unknown>;
    const accessToken = cookie?.['accessToken'] as string;

    if (!accessToken || typeof accessToken !== 'string') {
      throw new UnauthorizedException(ERROR_MESSAGES.MISSING_TOKEN);
    }

    try {
      const payload = await this._tokenService.verifyAccessToken(accessToken);
      const blackList = await this._tokenBlacklistRepo.get(payload.jti);
      if (blackList) {
        throw new UnauthorizedError(ERROR_MESSAGES.SESSION_EXPIRED);
      }
      request['user'] = payload;
      request['accessToken'] = accessToken;
      return true;
    } catch {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}
