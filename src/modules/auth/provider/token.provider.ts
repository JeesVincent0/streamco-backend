import { TOKEN_SERVICE } from '../application';
import { AccessTokenGuard, RefreshTokenGuard } from '../infrastructure/guards';
import { JwtTokenService } from '../infrastructure/token/jwt-token.service';

export const tokenProviders = [
  AccessTokenGuard,
  RefreshTokenGuard,
  JwtTokenService,
  {
    provide: TOKEN_SERVICE,
    useClass: JwtTokenService,
  },
];
