import {
  SigninDto,
  SignupAdvertiserUserDto,
  SignupNormalUserDto,
} from '../dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfirmSignupUserUseCase } from '../../application/use-cases/signup/confirm-signup-user.usecase';
import {
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../../application/use-cases';
import { SigninUseCase } from '../../application/use-cases/signin';
import { AdminSigninUseCase } from '../../application/use-cases/signin/admin-signin-usecase';
import { type Response } from 'express';
import { SignoutUseCase } from '../../application/use-cases/signup/signout.usecase';
import type { RequestWithUserInterface } from '../interfaces';
import { AccessTokenGuard } from '@/modules/auth-security/presentation';
import { AccessTokenPayload } from '@/modules/auth-security/application/types';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth')
export class RegistrationController {
  constructor(
    private readonly _signinUseCase: SigninUseCase,
    private readonly _signupNormalUserUseCase: SignupNormalUserUseCase,
    private readonly _signupAdvertiserUserUseCase: SignupAdvertiserUseCase,
    private readonly _confirmSignupUserUseCase: ConfirmSignupUserUseCase,
    private readonly _adminSigninUseCase: AdminSigninUseCase,
    private readonly _signoutUseCase: SignoutUseCase,
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
  async confirm(
    @Body() dto: { id: string; otp: number },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, responseData } =
      await this._confirmSignupUserUseCase.execute({
        id: dto.id,
        otp: dto.otp,
      });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth/refresh-token',
    });

    return {
      status: 'success',
      message: 'Signup successfull',
      data: responseData,
    };
  }

  // Signin for both user and advertiser
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, responseData } =
      await this._signinUseCase.execute(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 10,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth/refresh-token',
    });

    return {
      status: 'success',
      message: 'User successfully signined',
      data: responseData,
    };
  }

  // admin signin
  @Post('admin/signin')
  @HttpCode(HttpStatus.OK)
  async adminSignin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, responseData } =
      await this._adminSigninUseCase.execute(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth/refresh-token',
    });

    return {
      status: 'success',
      message: 'Admin signin successfull',
      data: responseData,
    };
  }

  @Post(`/logout`)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  logout(
    @Req() req: RequestWithUserInterface,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = this._signoutUseCase.execute(req.user as AccessTokenPayload);
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/api/refresh-token',
    });
    return data;
  }
}
