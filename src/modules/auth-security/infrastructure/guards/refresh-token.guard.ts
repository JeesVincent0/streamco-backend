import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type TokenServicePort } from '../../application';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { TOKEN_SERVICE } from '../../application/tokens';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
  ) {}
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
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}
