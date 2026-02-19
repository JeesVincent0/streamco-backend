import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { VerifyResetPasswordOtpDto } from '../dto';
import { VerifyResetPasswordOtpUseCase } from '../../application';
import { type Response } from 'express';

@Controller('auth')
export class ResetPasswordController {
  constructor(
    private readonly _verifyResetPasswordOtpUseCase: VerifyResetPasswordOtpUseCase,
  ) {}

  @Post('verify-reset-password')
  @HttpCode(HttpStatus.OK)
  verifyResetPasswordOtp(
    @Body() dto: VerifyResetPasswordOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this._verifyResetPasswordOtpUseCase.execute(dto);
    res.cookie('resetPassword', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      secure: process.env.NODE_ENV === 'production' || false,
      sameSite: 'lax',
      path: '/api/auth/',
    });
    return {
      status: 'success',
      message: 'OTP verified successfully',
    };
  }
}
