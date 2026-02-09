import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

// Use Cases
import {
  GetOtpTimerUseCase,
  ResendOtpUseCase,
} from '../../application/use-cases';
import { OtpVerificationUseCase } from '../../application/use-cases';

// DTO's
import { GenerateOtpDto } from '../dto';
import { otpVerificationDto } from '../dto';
import { IdDto } from '../dto/id.dto';
import { SigninDto } from '../dto/signin.dto';
import { SigninUseCase } from '../../application/use-cases/user-signin.usecase';
import { GenerateOtpUseCase } from '../../application/use-cases/generate-otp.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _generateOtpUseCase: GenerateOtpUseCase,
    private readonly _signinUseCase: SigninUseCase,
    private readonly _resendOtpUseCase: ResendOtpUseCase,
    private readonly _getOtpTimerUseCase: GetOtpTimerUseCase,
    private readonly _otpVerificationUseCase: OtpVerificationUseCase,
  ) {}

  // OTP verification for both user and advertiser
  @Post('otp-verification')
  @HttpCode(HttpStatus.OK)
  otpVerification(@Body() dto: otpVerificationDto) {
    return this._otpVerificationUseCase.execute({
      id: dto.id,
      otp: dto.otp,
    });
  }

  // Resend OTP for both user and advertiser
  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  resendOtp(@Body() dto: IdDto) {
    return this._resendOtpUseCase.execute(dto);
  }

  // OTP timer for both user and advertiser
  @Get('otp-timer/:id')
  @HttpCode(HttpStatus.OK)
  getOtpTime(@Param('id') id: string) {
    return this._getOtpTimerUseCase.execute(id);
  }

  // Signin for both user and advertiser
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    return this._signinUseCase.execute(dto);
  }

  @Post('/generate-otp')
  @HttpCode(HttpStatus.OK)
  generateOtp(@Body() dto: GenerateOtpDto) {
    return this._generateOtpUseCase.execute(dto);
  }

  // Logout
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logoutUser() {
    return 'logout';
  }
}
