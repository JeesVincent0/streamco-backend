import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { UnauthorizedError } from '@/shared/errors';
import type {
  BlacklistTokenPort,
  TokenServicePort,
} from '@/modules/auth-security/application';
import {
  BLACKLIST_TOKEN_CACKE,
  TOKEN_SERVICE,
} from '@/modules/auth-security/application/tokens';

@Injectable()
export class ResetPasswordTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
    @Inject(BLACKLIST_TOKEN_CACKE)
    private readonly _tokenBlacklistRepo: BlacklistTokenPort,
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
