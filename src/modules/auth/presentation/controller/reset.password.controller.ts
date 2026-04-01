import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResetPasswordDto, VerifyResetPasswordOtpDto } from '../dto';
import {
  type IResetPasswordUseCase,
  type IVerifyResetPasswordOtpUseCase,
  RESET_PASSWORD_USE_CASE_TOKEN,
  VERIFY_RESET_PASSWORD_OTP_USE_CASE_TOKEN,
} from '../../application';
import { type Response } from 'express';
import { ResetPasswordTokenGuard } from '@/modules/auth-security/presentation/guards/reset-password.guard';
import { type RequestWithUserInterface } from '../interfaces';

@Controller('auth')
export class ResetPasswordController {
  constructor(
    @Inject(RESET_PASSWORD_USE_CASE_TOKEN)
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,

    @Inject(VERIFY_RESET_PASSWORD_OTP_USE_CASE_TOKEN)
    private readonly _verifyResetPasswordOtpUseCase: IVerifyResetPasswordOtpUseCase,
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
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this._resetPasswordUseCase.execute({
      ...dto,
      payload: req.user,
      jwtToken: req.jwtToken,
    });

    res.clearCookie('resetPassword', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth',
    });

    return result;
  }
}
