import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IResetPasswordPayload,
  IVerifiedAccessTokenPayload,
  IVerifiedRefreshTokenPayload,
  IVerifiedResetPasswordTokenPayload,
} from './type';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');
export interface TokenServicePort {
  generateAccessToken(payload: IAccessTokenPayload): Promise<string>;
  generateRefreshToken(payload: IRefreshTokenPayload): Promise<string>;
  generateResetPasswordToken(payload: IResetPasswordPayload): Promise<string>;
  verifyRefreshToken(token: string): Promise<IVerifiedRefreshTokenPayload>;
  verifyAccessToken(token: string): Promise<IVerifiedAccessTokenPayload>;
  verifyResetPassword(
    token: string,
  ): Promise<IVerifiedResetPasswordTokenPayload>;
}
