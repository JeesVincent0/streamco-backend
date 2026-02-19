import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_SERVICE, type TokenServicePort } from '../../application';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookie = request.cookies as Record<string, unknown>;
    console.log('cookie from accessToken guard: ', cookie);
    const accessToken = cookie?.['accessToken'] as string;

    if (!accessToken || typeof accessToken !== 'string') {
      throw new UnauthorizedException(ERROR_MESSAGES.MISSING_TOKEN);
    }

    try {
      const payload = await this._tokenService.verifyAccessToken(accessToken);
      request['user'] = payload;
      request['accessToken'] = accessToken;
      return true;
    } catch {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}
