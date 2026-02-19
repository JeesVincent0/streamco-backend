import { JwtService } from '@nestjs/jwt';
import { TokenServicePort } from '../../application';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
} from '../../application/ports/token/type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(private readonly _jwtService: JwtService) {}
  generateAccessToken(payload: IAccessTokenPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: '10min',
    });
  }
  generateRefreshToken(payload: IRefreshTokenPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: '7d',
    });
  }
  verifyAccessToken(token: string): Promise<any> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    });
  }
  verifyRefreshToken(token: string): Promise<any> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }
}
