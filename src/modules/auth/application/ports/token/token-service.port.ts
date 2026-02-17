export interface TokenServicePort {
  generateAccessToken(payload: any): Promise<string>;
  generateRefreshToken(payload: any): Promise<string>;
  verifyRefreshToken(token: string): Promise<any>;
  verifyAccessToken(token: string): Promise<any>;
}
