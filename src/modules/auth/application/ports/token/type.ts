import { UserRole } from '@/modules/user/domain';

export interface IAccessTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  scope: string;
  role: UserRole;
  iat: number;
}

export interface IRefreshTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;
}
