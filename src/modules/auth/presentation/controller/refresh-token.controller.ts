import {
  Req,
  Res,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  Inject,
} from '@nestjs/common';
import { type Response } from 'express';
import { type RequestWithUserInterface } from '../interfaces';
import {
  REFRESH_ACCESS_TOKEN_USE_CASE_TOKEN,
  type IRefreshAccessTokenUseCase,
} from '../../application';
import { RefreshTokenGuard } from '@/modules/auth-security/presentation';

// This controller will handle the refresh token logic
// It will be responsible for validating the refresh token,
// generating a new access token, and sending it back to the client.

@Controller('auth')
export class RefreshTokenController {
  constructor(
    @Inject(REFRESH_ACCESS_TOKEN_USE_CASE_TOKEN)
    private readonly _refreshAccessTokenUseCase: IRefreshAccessTokenUseCase,
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
    return;
  }
}
