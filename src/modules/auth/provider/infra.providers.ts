import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';
import {
  AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
  MAIL_SERVICE_PORT_TOKEN,
  OTP_SERVICE_TOKEN,
  PASSWORD_HASHER_PORT_TOKEN,
  REFRESH_TOKEN_REPOSITORY_PORT,
} from '../application';
import {
  BcryptPasswordHasherImpl,
  NodemailerService,
  OtpGenerator,
} from '../infrastructure';
import { MonogodbRefreshTokenRepository } from '../infrastructure/repository';

export const infraProviders = [
  {
    provide: PASSWORD_HASHER_PORT_TOKEN,
    useClass: BcryptPasswordHasherImpl,
  },

  {
    provide: OTP_SERVICE_TOKEN,
    useClass: OtpGenerator,
  },

  {
    provide: AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
    useClass: RedisAuthCachedUserRepository,
  },

  {
    provide: MAIL_SERVICE_PORT_TOKEN,
    useClass: NodemailerService,
  },

  {
    provide: REFRESH_TOKEN_REPOSITORY_PORT,
    useClass: MonogodbRefreshTokenRepository,
  },
];
