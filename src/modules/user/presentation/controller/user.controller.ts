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
  HttpCode,
  HttpStatus,
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
  VerifyOtpEmailUpdateInterface,
} from '../../application/interfaces';
import {
  GET_USER_PROFILE_INTERFACE_PORT,
  UPDATE_USER_BASIC_USE_CASE,
  UPDATE_USER_EMAIL_USE_CASE,
  VERIFY_OTP_EMAIL_UPDATE_USE_CASE,
} from '../../application';
import { UpdateBasicDto, UpdateEmailDto } from '../dto';
import { OtpVerificationDto } from '@/shared/presentation';

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

    @Inject(VERIFY_OTP_EMAIL_UPDATE_USE_CASE)
    private readonly _verifyOtpEmailUpdate: VerifyOtpEmailUpdateInterface,
  ) {}

  @Get('base')
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return this._getBaseUserUseCase.execute({
      id: req.user.sub,
    });
  }

  @Get('profile')
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: RequestWithUserInterface) {
    return this._getUserProfileUseCase.execute({
      id: req.user.sub,
    });
  }

  @Put('profile/update-email')
  @Scopes(SCOPE.USER_WRITE)
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() body: OtpVerificationDto) {
    return this._verifyOtpEmailUpdate.execute({
      id: body.id,
      purpose: body.purpose,
      otp: body.otp,
    });
  }
}
