import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  type BaseCachedUserRepositoryPort,
  TOKEN_BLACK_LIST_CACHE,
  TOKEN_SERVICE,
  type TokenServicePort,
} from '../../application';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { UnauthorizedError } from '@/shared/errors';

@Injectable()
export class ResetPasswordTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
    @Inject(TOKEN_BLACK_LIST_CACHE)
    private readonly _tokenBlacklistRepo: BaseCachedUserRepositoryPort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookie = request.cookies as Record<string, unknown>;
    const token = cookie?.['resetPassword'] as string;

    if (!token || typeof token !== 'string') {
      throw new UnauthorizedError(ERROR_MESSAGES.SESSION_EXPIRED);
    }

    try {
      const payload = await this._tokenService.verifyResetPassword(token);
      const blackList = await this._tokenBlacklistRepo.get(payload.jti);
      if (blackList) {
        throw new UnauthorizedError(ERROR_MESSAGES.SESSION_EXPIRED);
      }
      request['user'] = payload;
      request['jwtToken'] = token;
      return true;
    } catch {
      throw new UnauthorizedError(ERROR_MESSAGES.SESSION_EXPIRED);
    }
  }
}
