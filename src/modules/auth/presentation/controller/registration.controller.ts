import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdvertiserRegisterDto, UserRegisterDto } from '../dto';
import { UserRole } from '@/modules/user/domain/enums';
import { RegisterUserUseCase } from '../../application/use-cases';
import { AdvertiserRegisterInput } from '../../application/inputs';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth/register')
export class RegistrationController {
  constructor(private readonly _registerUseCase: RegisterUserUseCase) {}

  // Normal User registration
  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: UserRegisterDto) {
    return this._registerUseCase.execute({
      ...dto,
      dob: new Date(dto.dob),
      role: UserRole.USER,
    });
  }

  // Advertiser registration
  @Post('advertiser')
  @HttpCode(HttpStatus.CREATED)
  registerAdvertiser(@Body() dto: AdvertiserRegisterDto) {
    return this._registerUseCase.execute({
      ...(dto as AdvertiserRegisterInput),
      role: UserRole.ADVERTISER,
    });
  }
}
