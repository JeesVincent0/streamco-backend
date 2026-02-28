import { BLACKLIST_TOKEN_CACKE, TOKEN_SERVICE } from '../application/tokens';
import {
  AccessTokenGuard,
  BlacklistTokenService,
  JwtTokenService,
  RefreshTokenGuard,
} from '../infrastructure';
import { ResetPasswordTokenGuard } from '../infrastructure/guards/reset-password.guard';

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
