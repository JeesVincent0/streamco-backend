import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { VerifyResetPasswordOtpDto } from '../dto';
import { VerifyResetPasswordOtpUseCase } from '../../application';

@Controller('auth')
export class ResetPasswordController {
  constructor(
    private readonly _verifyResetPasswordOtpUseCase: VerifyResetPasswordOtpUseCase,
  ) {}

  @Post('verify-reset-password')
  @HttpCode(HttpStatus.OK)
  verifyResetPasswordOtp(@Body() dto: VerifyResetPasswordOtpDto) {
    return this._verifyResetPasswordOtpUseCase.execute(dto);
  }
}
