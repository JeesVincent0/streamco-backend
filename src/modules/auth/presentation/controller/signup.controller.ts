import { SignupAdvertiserUserDto, SignupNormalUserDto } from '../dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfirmSignupUserUseCase } from '../../application/use-cases/signup/confirm-signup-user.usecase';
import {
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../../application/use-cases';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth/signup')
export class RegistrationController {
  constructor(
    private readonly _signupNormalUserUseCase: SignupNormalUserUseCase,
    private readonly _signupAdvertiserUserUseCase: SignupAdvertiserUseCase,

    private readonly _confirmSignupUserUseCase: ConfirmSignupUserUseCase,
  ) {}

  // Normal User registration
  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: SignupNormalUserDto) {
    return this._signupNormalUserUseCase.execute({
      ...dto,
      dob: new Date(dto.dob),
    });
  }

  // Advertiser registration
  @Post('advertiser')
  @HttpCode(HttpStatus.CREATED)
  registerAdvertiser(@Body() dto: SignupAdvertiserUserDto) {
    return this._signupAdvertiserUserUseCase.execute({
      ...dto,
    });
  }

  // Confrim registration by OTP verification
  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  confirm(@Body() dto: { id: string; otp: number }) {
    return this._confirmSignupUserUseCase.execute({
      id: dto.id,
      otp: dto.otp,
    });
  }
}
