import { TOKEN_SERVICE } from '../application';
import { AccessTokenGuard, RefreshTokenGuard } from '../infrastructure/guards';
import { ResetPasswordTokenGuard } from '../infrastructure/guards/reset-password.guard';
import { JwtTokenService } from '../infrastructure/token/jwt-token.service';

export const tokenProviders = [
  AccessTokenGuard,
  RefreshTokenGuard,
  ResetPasswordTokenGuard,
  JwtTokenService,
  {
    provide: TOKEN_SERVICE,
    useClass: JwtTokenService,
  },
];
