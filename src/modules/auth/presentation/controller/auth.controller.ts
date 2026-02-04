import { Body, Controller, Post } from '@nestjs/common';

// Use Cases
import {
  AdvertiserRegisterUseCase,
  RegisterUserUseCase,
} from '../../application/use-cases';
import { OtpVerificationUseCase } from '../../application/use-cases';

// DTO's
import { AdvertiserRegisterDto, UserRegisterDto } from '../dto';
import { otpVerificationDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _registerUseCase: RegisterUserUseCase,
    private readonly _otpVerificationUseCase: OtpVerificationUseCase,
    private readonly _advertiserRegisterUseCase: AdvertiserRegisterUseCase,
  ) {}

  // Normal User registration
  @Post('register')
  register(@Body() dto: UserRegisterDto) {
    return this._registerUseCase.execute({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      gender: dto.gender,
      dob: dto.dob,
    });
  }

  // OTP verification
  @Post('otp-verification')
  otpVerification(@Body() dto: otpVerificationDto) {
    return this._otpVerificationUseCase.execute({
      email: dto.email,
      otp: dto.otp,
    });
  }

  // Admin registration
  @Post('advertiser/register')
  registerAdvertiser(@Body() dto: AdvertiserRegisterDto) {
    return this._advertiserRegisterUseCase.execute(dto);
  }
}
