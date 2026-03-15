import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import type { RequestWithUserInterface } from '@/shared/interfaces';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetBaseUserUseCase } from '../../application/use-cases/get-user/get-base-user.usecase';
import { SCOPE } from '@/modules/auth-security/domain/enums';
import type {
  GetUserProfileInterface,
  UpdateUserBasicInterface,
  UpdateUserEmailInterface,
} from '../../application/interfaces';
import {
  GET_USER_PROFILE_INTERFACE_PORT,
  UPDATE_USER_BASIC_USE_CASE,
  UPDATE_USER_EMAIL_USE_CASE,
} from '../../application';
import { UpdateBasicDto, UpdateEmailDto } from '../dto';

@Controller('user')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserController {
  constructor(
    private readonly _getBaseUserUseCase: GetBaseUserUseCase,
    @Inject(GET_USER_PROFILE_INTERFACE_PORT)
    private readonly _getUserProfileUseCase: GetUserProfileInterface,

    @Inject(UPDATE_USER_EMAIL_USE_CASE)
    private readonly _updateUserEmailUseCase: UpdateUserEmailInterface,

    @Inject(UPDATE_USER_BASIC_USE_CASE)
    private readonly _updateUserBasicUseCase: UpdateUserBasicInterface,
  ) {}
  @Get('base')
  @Scopes(SCOPE.USER_READ)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return this._getBaseUserUseCase.execute({
      id: req.user.sub,
    });
  }

  @Get('profile')
  @Scopes(SCOPE.USER_READ)
  getProfile(@Req() req: RequestWithUserInterface) {
    return this._getUserProfileUseCase.execute({
      id: req.user.sub,
    });
  }

  @Put('profile/update-email')
  @Scopes(SCOPE.USER_WRITE)
  updateEmail(
    @Body() body: UpdateEmailDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._updateUserEmailUseCase.execute({
      userId: req.user.sub,
      newEmail: body.email,
    });
  }

  @Put('profile/update-basic')
  @Scopes(SCOPE.USER_WRITE)
  updateBasic(
    @Body() body: UpdateBasicDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._updateUserBasicUseCase.execute({
      userId: req.user.sub,
      displayName: body.displayName,
      bio: body.bio,
      gender: body.gender,
      dob: body.dob,
    });
  }

  @Post('/profile/verify-otp')
  @Scopes(SCOPE.USER_WRITE)
  verifyOtp(@Body() body: { id: string; purpose: string; otp: number }) {
    console.log('This is verify otp body: ', body);
  }

  @Post('/profile/resend-otp')
  @Scopes(SCOPE.USER_WRITE)
  resendOtp(@Body() body: { id: string }) {
    console.log('This is resend otp body: ', body);
    const date = new Date();

    return {
      status: 'success',
      message: 'Resend OTP',
      data: {
        otpResendAt: date.setSeconds(date.getSeconds() + 30),
      },
    };
  }
}
