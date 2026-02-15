import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenerateOtpDto, otpVerificationDto } from '../dto';
import { ResendOtpUseCase, VerifyOtpUseCase } from '../../application';
import { GenerateOtpUseCase } from '../../application';
import { ResendOtpDto } from '../dto/otp';

@Controller('auth/otp')
export class OtpController {
  constructor(
    private readonly _generateOtpUseCase: GenerateOtpUseCase,
    private readonly _verifyOtpUseCase: VerifyOtpUseCase,
    private readonly _resendOtpUseCase: ResendOtpUseCase,
  ) {}

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  resend(@Body() dto: ResendOtpDto) {
    return this._resendOtpUseCase.execute(dto);
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
  verify(@Body() dto: otpVerificationDto) {
    return this._verifyOtpUseCase.execute({
      id: dto.id,
      otp: dto.otp,
      purpose: dto.purpose,
    });
  }
}
