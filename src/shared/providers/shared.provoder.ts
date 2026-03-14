import { CACHE_BASE_REPO_PORT } from '../application/tokens';
import { RedisAuthCachedUserRepository } from '../infrastructure/cache/repositories/redis-auth-cached-user.repository';

export const sharedProvider = [
  {
    provide: CACHE_BASE_REPO_PORT,
    useClass: RedisAuthCachedUserRepository,
  },
];
