import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// Use Cases
import {
  // AdvertiserRegisterUseCase,
  RegisterUserUseCase,
} from '../../application/use-cases';
import { OtpVerificationUseCase } from '../../application/use-cases';

// DTO's
import { AdvertiserRegisterDto, UserRegisterDto } from '../dto';
import { otpVerificationDto } from '../dto';
import { UserRole } from '@/modules/user/domain/enums';
import { FileLogger } from '@/shared/logger/file-logger';
import { AdvertiserRegisterInput } from '../../application/inputs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _registerUseCase: RegisterUserUseCase,
    private readonly _otpVerificationUseCase: OtpVerificationUseCase,
    private readonly _logger: FileLogger,
  ) {}

  // Normal User registration
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: UserRegisterDto) {
    return this._registerUseCase.execute({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      gender: dto.gender,
      dob: new Date(dto.dob),
      role: UserRole.USER,
    });
  }

  // OTP verification
  @Post('otp-verification')
  @HttpCode(HttpStatus.OK)
  otpVerification(@Body() dto: otpVerificationDto) {
    return this._otpVerificationUseCase.execute({
      id: dto.id,
      otp: dto.otp,
    });
  }

  // Admin registration
  @Post('advertiser/register')
  @HttpCode(HttpStatus.CREATED)
  registerAdvertiser(@Body() dto: AdvertiserRegisterDto) {
    return this._registerUseCase.execute({
      ...(dto as AdvertiserRegisterInput),
      role: UserRole.ADVERTISER,
    });
  }

  // Logou
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logoutUser() {
    return 'logout';
  }
}
