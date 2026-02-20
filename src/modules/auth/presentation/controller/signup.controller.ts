import {
  SigninDto,
  SignupAdvertiserUserDto,
  SignupNormalUserDto,
} from '../dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfirmSignupUserUseCase } from '../../application/use-cases/signup/confirm-signup-user.usecase';
import {
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../../application/use-cases';
import { SigninUseCase } from '../../application/use-cases/signin';
import { AdminSigninUseCase } from '../../application/use-cases/signin/admin-signin-usecase';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth/')
export class RegistrationController {
  constructor(
    private readonly _signinUseCase: SigninUseCase,
    private readonly _signupNormalUserUseCase: SignupNormalUserUseCase,
    private readonly _signupAdvertiserUserUseCase: SignupAdvertiserUseCase,
    private readonly _confirmSignupUserUseCase: ConfirmSignupUserUseCase,
    private readonly _adminSigninUseCase: AdminSigninUseCase,
  ) {}

  // Normal User registration
  @Post('signup/user')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: SignupNormalUserDto) {
    return this._signupNormalUserUseCase.execute({
      ...dto,
      dob: new Date(dto.dob),
    });
  }

  // Advertiser registration
  @Post('signup/advertiser')
  @HttpCode(HttpStatus.CREATED)
  registerAdvertiser(@Body() dto: SignupAdvertiserUserDto) {
    return this._signupAdvertiserUserUseCase.execute({
      ...dto,
    });
  }

  // Confrim registration by OTP verification
  @Post('signup/confirm')
  @HttpCode(HttpStatus.OK)
  confirm(@Body() dto: { id: string; otp: number }) {
    return this._confirmSignupUserUseCase.execute({
      id: dto.id,
      otp: dto.otp,
    });
  }

  // Signin for both user and advertiser
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto) {
    return this._signinUseCase.execute(dto);
  }

  // admin signin
  @Post('admin/signin')
  @HttpCode(HttpStatus.OK)
  async adminSignin(@Body() dto: SigninDto) {
    return this._adminSigninUseCase.execute(dto);
  }
}
