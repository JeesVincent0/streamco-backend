import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { GenerateOtpDto } from '../dto';

// tokens
import {
  RESEND_OTP_USE_CASE_TOKEN,
  GENERATE_OTP_USE_CASE_TOKEN,
  VERIFY_OTP_USE_CASE_TOKEN,
} from '../../application';

import { ResendOtpDto } from '../dto/otp';
import { OtpVerificationDto } from '@/shared/presentation';

// interface
import type {
  IGenerateOtpUseCase,
  IResendOtpUseCase,
  IVerifyOtpUseCase,
} from '../../application/ports';

@Controller('auth/otp')
export class OtpController {
  constructor(
    @Inject(GENERATE_OTP_USE_CASE_TOKEN)
    private readonly _generateOtpUseCase: IGenerateOtpUseCase,

    @Inject(VERIFY_OTP_USE_CASE_TOKEN)
    private readonly _verifyOtpUseCase: IVerifyOtpUseCase,

    @Inject(RESEND_OTP_USE_CASE_TOKEN)
    private readonly _resendOtpUseCase: IResendOtpUseCase,
  ) {}

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  resend(@Body() dto: ResendOtpDto) {
    return this._resendOtpUseCase.execute({ id: dto.id });
  }

  // OTP generation
  @Post('generate')
  @HttpCode(HttpStatus.OK)
  generate(@Body() dto: GenerateOtpDto) {
    return this._generateOtpUseCase.execute({
      email: dto.email,
      purpose: dto.purpose,
    });
  }

  // OTP verification
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: OtpVerificationDto) {
    return this._verifyOtpUseCase.execute({
      id: dto.id,
      otp: dto.otp,
      purpose: dto.purpose,
    });
  }
}
