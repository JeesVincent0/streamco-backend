import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/auth-register.dot';
import { RegisterUserUseCase } from '../../application/use-cases/user-register.usecase';
import { otpVerificationDto } from '../dto/auth-otp-verification.dot';
import { OtpVerificationUseCase } from '../../application/use-cases/otp-verification.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _registerUseCase: RegisterUserUseCase,
    private readonly _otpVerificationUseCase: OtpVerificationUseCase,
  ) {}
  @Post('register')
  register(@Body() dto: UserRegisterDto) {
    return this._registerUseCase.execute(dto);
  }

  @Post('otp-verification')
  otpVerification(@Body() dto: otpVerificationDto) {
    return this._otpVerificationUseCase.execute(dto);
  }
}
