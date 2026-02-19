import { IAccessTokenPayload, IRefreshTokenPayload } from './type';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');
export interface TokenServicePort {
  generateAccessToken(payload: IAccessTokenPayload): Promise<string>;
  generateRefreshToken(payload: IRefreshTokenPayload): Promise<string>;
  verifyRefreshToken(token: string): Promise<IRefreshTokenPayload>;
  verifyAccessToken(token: string): Promise<IAccessTokenPayload>;
}
