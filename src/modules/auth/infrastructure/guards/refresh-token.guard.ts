import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenServicePort } from '../../application';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly _tokenService: TokenServicePort) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookie = request?.cookies as Record<string, unknown>;
    const accessToken = cookie?.refreshToken as string;

    if (!accessToken) {
      throw new UnauthorizedException(ERROR_MESSAGES.MISSING_TOKEN);
    }

    try {
      const payload = await this._tokenService.verifyRefreshToken(accessToken);
      request['user'] = payload;
      request['accessToken'] = accessToken;
      return true;
    } catch {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
    }
  }
}
