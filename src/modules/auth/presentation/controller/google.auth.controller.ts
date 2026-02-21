import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Request } from 'express';
import { GoogleAuthGuard } from '../../infrastructure/guards';

@Controller('auth')
export class GoogleAuthController {
  constructor() {}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallBack(@Req() req: Request) {
    console.log(req.user);
  }
}
