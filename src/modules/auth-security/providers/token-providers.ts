import { BLACKLIST_TOKEN_CACKE, TOKEN_SERVICE } from '../application/tokens';
import { BlacklistTokenService, JwtTokenService } from '../infrastructure';
import { AccessTokenGuard, RefreshTokenGuard } from '../presentation';
import { ResetPasswordTokenGuard } from '../presentation/guards/reset-password.guard';

export const tokenProviders = [
  AccessTokenGuard,
  RefreshTokenGuard,
  ResetPasswordTokenGuard,
  {
    provide: TOKEN_SERVICE,
    useClass: JwtTokenService,
  },

  {
    provide: BLACKLIST_TOKEN_CACKE,
    useClass: BlacklistTokenService,
  },
];
