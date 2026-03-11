import { UserRole } from '@/modules/user/domain';

export interface AccessTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;

  scope: string;
  role: UserRole;
}

export interface RefreshTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;
  role: UserRole;
}

export interface ResetPasswordPayload {
  sub: string;
  jti: string;
}

export interface JwtMeta {
  iat: number;
  exp: number;
}

export interface VerifiedAccessTokenPayload
  extends AccessTokenPayload, JwtMeta {}

export interface VerifiedRefreshTokenPayload
  extends RefreshTokenPayload, JwtMeta {}

export interface VerifiedResetPasswordTokenPayload
  extends ResetPasswordPayload, JwtMeta {}
