import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdvertiserRegisterDto, UserRegisterDto } from '../dto';
import { UserRole } from '@/modules/user/domain/enums';
import { RegisterUserUseCase } from '../../application/use-cases';
import { AdvertiserRegisterInput } from '../../application/inputs';
import { ConfirmRegistrationUseCase } from '../../application/use-cases/registration/confirm-registration.usecase';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth/register')
export class RegistrationController {
  constructor(
    private readonly _registerUseCase: RegisterUserUseCase,
    private readonly _confirmRegistrationUseCase: ConfirmRegistrationUseCase,
  ) {}

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

  // Confrim registration by OTP verification
  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  confirm(@Body() dto: { id: string; otp: number }) {
    return this._confirmRegistrationUseCase.execute({
      id: dto.id,
      otp: dto.otp,
    });
  }
}
