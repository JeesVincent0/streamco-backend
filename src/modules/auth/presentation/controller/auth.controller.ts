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
  RegisterUserUseCase,
  ResendOtpUseCase,
} from '../../application/use-cases';
import { OtpVerificationUseCase } from '../../application/use-cases';

// DTO's
import { AdvertiserRegisterDto, UserRegisterDto } from '../dto';
import { otpVerificationDto } from '../dto';
import { UserRole } from '@/modules/user/domain/enums';
import { AdvertiserRegisterInput } from '../../application/inputs';
import { IdDto } from '../dto/id.dto';
import { SigninDto } from '../dto/signin.dto';
import { SigninUseCase } from '../../application/use-cases/user-signin.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _signinUseCase: SigninUseCase,
    private readonly _resendOtpUseCase: ResendOtpUseCase,
    private readonly _getOtpTimerUseCase: GetOtpTimerUseCase,
    private readonly _registerUseCase: RegisterUserUseCase,
    private readonly _otpVerificationUseCase: OtpVerificationUseCase,
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

  // Resend OTP
  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  resendOtp(@Body() dto: IdDto) {
    return this._resendOtpUseCase.execute(dto);
  }

  // OTP timer
  @Get('otp-timer/:id')
  @HttpCode(HttpStatus.OK)
  getOtpTime(@Param('id') id: string) {
    return this._getOtpTimerUseCase.execute(id);
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

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    this._signinUseCase.execute(dto);
  }
  // Logout
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logoutUser() {
    return 'logout';
  }
}
