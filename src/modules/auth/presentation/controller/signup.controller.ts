import {
  SigninDto,
  SignupNormalUserDto,
  SignupAdvertiserUserDto,
} from '../dto';

import {
  Req,
  Res,
  Post,
  Body,
  Inject,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

import { type Response } from 'express';
import { type RequestWithUserInterface } from '../interfaces';
import { AccessTokenGuard } from '@/modules/auth-security/presentation';
import { AccessTokenPayload } from '@/modules/auth-security/application/types';

import {
  SIGNIN_USE_CASE_TOKEN,
  SIGNOUT_USE_CASE_TOKEN,
  ADMIN_SIGNIN_USE_CASE_TOKEN,
  CONFIRM_SIGNUP_USE_CASE_TOKEN,
  SIGNUP_ADVERTISER_USE_CASE_TOKEN,
  SIGNUP_NORMAL_USER_USE_CASE_TOKEN,
  type ISignoutUseCase,
  type IConfirmSignupUserUseCase,
  type ISignupAdvertiserUseCase,
  type ISignupNormalUserUseCase,
  type IAdminSigninUseCase,
  type ISigninUseCase,
} from '../../application';

// Controller for handling registration
// of both normal users and advertisers.
// Separate controller created to follow
// SRP and to avoid bloating of AuthController
// which is already handling multiple responsibilities
// like OTP generation, OTP verification, user signin etc.

@Controller('auth')
export class RegistrationController {
  constructor(
    @Inject(SIGNIN_USE_CASE_TOKEN)
    private readonly _signinUseCase: ISigninUseCase,

    @Inject(SIGNUP_NORMAL_USER_USE_CASE_TOKEN)
    private readonly _signupNormalUserUseCase: ISignupNormalUserUseCase,

    @Inject(SIGNUP_ADVERTISER_USE_CASE_TOKEN)
    private readonly _signupAdvertiserUserUseCase: ISignupAdvertiserUseCase,

    @Inject(CONFIRM_SIGNUP_USE_CASE_TOKEN)
    private readonly _confirmSignupUserUseCase: IConfirmSignupUserUseCase,

    @Inject(ADMIN_SIGNIN_USE_CASE_TOKEN)
    private readonly _adminSigninUseCase: IAdminSigninUseCase,

    @Inject(SIGNOUT_USE_CASE_TOKEN)
    private readonly _signoutUseCase: ISignoutUseCase,
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
      path: '/',
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
      path: '/',
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
      path: '/',
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
      path: '/',
    });
    return data;
  }
}
