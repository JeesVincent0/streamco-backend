import { IAccessTokenPayload, IRefreshTokenPayload } from './type';

export interface TokenServicePort {
  generateAccessToken(payload: IAccessTokenPayload): Promise<string>;
  generateRefreshToken(payload: IRefreshTokenPayload): Promise<string>;
  verifyRefreshToken(token: string): Promise<any>;
  verifyAccessToken(token: string): Promise<any>;
}
