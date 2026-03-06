import { RefreshTokenGuard } from '@/modules/auth-security/presentation';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RefreshAccessTokenUseCase } from '../../application/use-cases/token/refresh-accessp-token.usecase';
import { type Response } from 'express';
import { type RequestWithUserInterface } from '../interfaces';

// This controller will handle the refresh token logic
// It will be responsible for validating the refresh token,
// generating a new access token, and sending it back to the client.

@Controller()
export class RefreshTokenController {
  constructor(
    private readonly _refreshAccessTokenUseCase: RefreshAccessTokenUseCase,
  ) {}
  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUserInterface,
  ) {
    const accessToken = await this._refreshAccessTokenUseCase.execute(
      req.user.sub,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
  }
}
