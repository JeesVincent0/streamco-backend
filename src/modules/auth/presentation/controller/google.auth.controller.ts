import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request } from 'express';

import { RequestWithGoogle } from '../interfaces/request-with-google.interface';
import { AUTH_REDIRECT_MAP } from '../config';
import { GoogleAuthGuard } from '../../infrastructure';
import {
  GOOGLE_AUTH_USE_CASE_TOKEN,
  type IGoogleAuthUseCase,
} from '../../application';

@Controller('auth')
export class GoogleAuthController {
  constructor(
    @Inject(GOOGLE_AUTH_USE_CASE_TOKEN)
    private readonly _googleAuthSignupUseCase: IGoogleAuthUseCase,
  ) {}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.CREATED)
  async googleCallBack(
    @Req() req: RequestWithGoogle,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, role } =
      await this._googleAuthSignupUseCase.execute({
        googleId: req.user.googleId,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        displayName: req.user.displayName,
        avatarUrl: req.user?.avatarUrl,
        intent: req.user?.intent,
        role: req.user?.role,
      });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
    const redirectPath = AUTH_REDIRECT_MAP[role];

    return res.redirect(`${frontendBaseUrl}${redirectPath}`);
  }
}
