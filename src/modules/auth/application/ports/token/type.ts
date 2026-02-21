import { UserRole } from '@/modules/user/domain';

export interface IAccessTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;

  scope: string;
  role: UserRole;
}

export interface IRefreshTokenPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;
}

export interface IResetPasswordPayload {
  sub: string;
  jti: string;
}

export interface JwtMeta {
  iat: number;
  exp: number;
}

export interface IVerifiedAccessTokenPayload
  extends IAccessTokenPayload, JwtMeta {}

export interface IVerifiedRefreshTokenPayload
  extends IRefreshTokenPayload, JwtMeta {}

export interface IVerifiedResetPasswordTokenPayload
  extends IResetPasswordPayload, JwtMeta {}
