import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenServicePort } from '../../application';
import { Request } from 'express';

export class AccessTokenGuard implements CanActivate {
  constructor(private readonly _tokenService: TokenServicePort) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookie = request.cookies as Record<string, unknown>;
    const refreshToken = cookie?.['refreshToken'] as string;

    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = await this._tokenService.verifyAccessToken(refreshToken);
      request['user'] = payload;
      request['refreshToken'] = refreshToken;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
