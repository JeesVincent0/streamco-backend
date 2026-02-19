import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_SERVICE, type TokenServicePort } from '../../application';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly _tokenService: TokenServicePort,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('This is request from the accessToken guard: ', request);

    const cookie = request.cookies as Record<string, unknown>;
    console.log('cookie from accessToken guard: ', cookie);
    const accessToken = cookie?.['accessToken'] as string;

    if (!accessToken || typeof accessToken !== 'string') {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = await this._tokenService.verifyAccessToken(accessToken);
      request['user'] = payload;
      request['accessToken'] = accessToken;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
