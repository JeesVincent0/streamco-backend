import { UserRole } from '@/modules/user/domain';

export const AUTH_REDIRECT_MAP: Partial<Record<UserRole, string>> = {
  [UserRole.USER]: '/home',
  [UserRole.ADVERTISER]: '/advertiser',
};

export const DEFAULT_REDIRECT = '/';
