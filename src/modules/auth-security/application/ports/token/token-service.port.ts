import {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordPayload,
  VerifiedAccessTokenPayload,
  VerifiedRefreshTokenPayload,
  VerifiedResetPasswordTokenPayload,
} from '../../types';

export interface TokenServicePort {
  generateAccessToken(payload: AccessTokenPayload): Promise<string>;
  generateRefreshToken(payload: RefreshTokenPayload): Promise<string>;
  generateResetPasswordToken(payload: ResetPasswordPayload): Promise<string>;
  verifyRefreshToken(token: string): Promise<VerifiedRefreshTokenPayload>;
  verifyAccessToken(token: string): Promise<VerifiedAccessTokenPayload>;
  verifyResetPassword(
    token: string,
  ): Promise<VerifiedResetPasswordTokenPayload>;
}
