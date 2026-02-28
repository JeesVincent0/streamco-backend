import { JwtService } from '@nestjs/jwt';
import { TokenServicePort } from '../../../auth/application';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IResetPasswordPayload,
  IVerifiedAccessTokenPayload,
  IVerifiedRefreshTokenPayload,
  IVerifiedResetPasswordTokenPayload,
} from '../../../../shared/interfaces/token-type';
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

  generateResetPasswordToken(payload: IResetPasswordPayload): Promise<string> {
    return this._jwtService.signAsync(payload, {
      secret: process.env.RESET_PSSWORD_TOKEN_SECRET_KEY,
      expiresIn: '5min',
    });
  }
  verifyAccessToken(token: string): Promise<IVerifiedAccessTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    });
  }
  verifyRefreshToken(token: string): Promise<IVerifiedRefreshTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }
  verifyResetPassword(
    token: string,
  ): Promise<IVerifiedResetPasswordTokenPayload> {
    return this._jwtService.verifyAsync(token, {
      secret: process.env.RESET_PSSWORD_TOKEN_SECRET_KEY,
    });
  }
}
