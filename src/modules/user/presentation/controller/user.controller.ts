import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';

import {
  Put,
  Req,
  Get,
  Post,
  Body,
  Inject,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import type { Express } from 'express';
import { OtpVerificationDto } from '@/shared/presentation';
import { FileInterceptor } from '@nestjs/platform-express';
import { SCOPE } from '@/modules/auth-security/domain/enums';
import type { RequestWithUserInterface } from '@/shared/interfaces';
import { SocialLinksDto, UpdateBasicDto, UpdateEmailDto } from '../dto';

// interfaces
import type {
  IGetBaseUserUseCase,
  IGetUserProfileUseCase,
  IUpdateUserEmailUseCase,
  IUpdateUserBasicUseCase,
  IUpdateUserAvatarUlrUsecase,
  IVerifyOtpEmailUpdateUseCase,
  IUpdateUserSocialLinksUseCase,
} from '../../application/ports';

// TOKENS
import {
  GET_BASE_USER_USE_CASE_TOKEN,
  GET_USER_PROFILE_USE_CASE_TOKEN,
  UPDATE_USER_EMAIL_USE_CASE_TOKEN,
  UPDATE_USER_BASIC_USE_CASE_TOKEN,
  UPDATE_USER_AVATAR_URL_USE_CASE_TOKEN,
  VERIFY_OTP_EMAIL_UPDATE_USE_CASE_TOKEN,
  UPDATE_USER_SOCIAL_LINKS_USE_CASE_TOKEN,
} from '../../application/user.tokens';

@Controller('user')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserController {
  constructor(
    @Inject(GET_BASE_USER_USE_CASE_TOKEN)
    private readonly _getBaseUserUseCase: IGetBaseUserUseCase,

    @Inject(GET_USER_PROFILE_USE_CASE_TOKEN)
    private readonly _getUserProfileUseCase: IGetUserProfileUseCase,

    @Inject(UPDATE_USER_EMAIL_USE_CASE_TOKEN)
    private readonly _updateUserEmailUseCase: IUpdateUserEmailUseCase,

    @Inject(UPDATE_USER_BASIC_USE_CASE_TOKEN)
    private readonly _updateUserBasicUseCase: IUpdateUserBasicUseCase,

    @Inject(VERIFY_OTP_EMAIL_UPDATE_USE_CASE_TOKEN)
    private readonly _verifyOtpEmailUpdate: IVerifyOtpEmailUpdateUseCase,

    @Inject(UPDATE_USER_SOCIAL_LINKS_USE_CASE_TOKEN)
    private readonly _updateSocialLinks: IUpdateUserSocialLinksUseCase,

    @Inject(UPDATE_USER_AVATAR_URL_USE_CASE_TOKEN)
    private readonly _updateUserAvatarUrl: IUpdateUserAvatarUlrUsecase,
  ) {}

  @Get('base')
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return this._getBaseUserUseCase.execute({
      id: req.user.sub,
    });
  }

  @Get('profile/:id')
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: RequestWithUserInterface, @Param('id') id: string) {
    return this._getUserProfileUseCase.execute({
      id: req.user.sub,
      paramsId: id,
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
      companyName: body.companyName,
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

  @Put('profile/social-links')
  @Scopes(SCOPE.USER_WRITE)
  @HttpCode(HttpStatus.OK)
  updateSocialLinks(
    @Body() body: SocialLinksDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._updateSocialLinks.execute({
      id: req.user.sub,
      instagram: body.instagram,
      facebook: body.facebook,
      x: body.x,
      youtube: body.youtube,
    });
  }

  @Post('profile/avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.MulterS3.File,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._updateUserAvatarUrl.execute({
      userId: req.user.sub,
      avatarUrl: file.location,
    });
  }
}
