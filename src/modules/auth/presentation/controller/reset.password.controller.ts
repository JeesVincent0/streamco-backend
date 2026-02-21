import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResetPasswordDto, VerifyResetPasswordOtpDto } from '../dto';
import { VerifyResetPasswordOtpUseCase } from '../../application';
import { type Response } from 'express';
import { ResetPasswordTokenGuard } from '../../infrastructure/guards/reset-password.guard';
import { ResetPasswordUseCase } from '../../application/use-cases/';
import { type RequestWithUserInterface } from '../interfaces';

@Controller('auth')
export class ResetPasswordController {
  constructor(
    private readonly _resetPasswordUseCase: ResetPasswordUseCase,
    private readonly _verifyResetPasswordOtpUseCase: VerifyResetPasswordOtpUseCase,
  ) {}

  @Post('verify-reset-password')
  @HttpCode(HttpStatus.OK)
  async verifyResetPasswordOtp(
    @Body() dto: VerifyResetPasswordOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this._verifyResetPasswordOtpUseCase.execute(dto);

    res.cookie('resetPassword', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth',
    });

    return {
      status: 'success',
      message: 'OTP verified successfully',
    };
  }

  @Post('reset-password')
  @UseGuards(ResetPasswordTokenGuard)
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._resetPasswordUseCase.execute({
      ...dto,
      payload: req.user,
      jwtToken: req.jwtToken,
    });
  }
}
