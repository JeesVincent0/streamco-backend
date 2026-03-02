import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordPayload,
  VerifiedAccessTokenPayload,
  VerifiedRefreshTokenPayload,
  VerifiedResetPasswordTokenPayload,
} from '@/shared/interfaces/token-type';
import { Injectable } from '@nestjs/common';
import { TokenServicePort } from '../../application';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(private readonly _jwtService: JwtService) {}
  generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: '10min',
    });
  }
  generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: '7d',
    });
  }

  generateResetPasswordToken(payload: ResetPasswordPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.RESET_PSSWORD_TOKEN_SECRET_KEY,
      expiresIn: '5min',
    });
  }
  verifyAccessToken(token: string): Promise<VerifiedAccessTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    });
  }
  verifyRefreshToken(token: string): Promise<VerifiedRefreshTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }
  verifyResetPassword(
    token: string,
  ): Promise<VerifiedResetPasswordTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.RESET_PSSWORD_TOKEN_SECRET_KEY,
    });
  }
}
