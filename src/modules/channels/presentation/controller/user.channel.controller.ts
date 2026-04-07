import {
  Get,
  Req,
  Body,
  Post,
  Query,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import {
  GET_CHANNELS_USE_CASE_TOKEN,
  CREATE_CHANNEL_USE_CASE_TOKEN,
} from '../../application/token';

import type {
  IGetChannelsUseCase,
  ICreateChannelUseCase,
} from '../../application/ports';

import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';

import { ROUTES } from '@/shared/constants/routes';
import { SCOPE } from '@/modules/auth-security/domain';
import { type RequestWithUserInterface } from '@/shared/interfaces';
import { CreateChannelDto, GetChannelsQueryDto } from '../dto';

@Controller(ROUTES.CHANNEL.CHANNELS)
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserChannelController {
  constructor(
    @Inject(CREATE_CHANNEL_USE_CASE_TOKEN)
    private readonly _createChannelUseCase: ICreateChannelUseCase,

    @Inject(GET_CHANNELS_USE_CASE_TOKEN)
    private readonly _getChannelsUseCase: IGetChannelsUseCase,
  ) {}

  @Post(ROUTES.COMMON.CREATE)
  @Scopes(SCOPE.USER_WRITE)
  @HttpCode(HttpStatus.OK)
  async createChannel(
    @Body() body: CreateChannelDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._createChannelUseCase.execute({
      channelId: body.channelId,
      channelName: body.channelName,
      profileImageUrl: body.profileImage,
      userId: req.user.sub,
      backgroundBannerUrl: body.backgroundBanner,
      bio: body.bio,
    });
  }

  @Get()
  getChannels(
    @Query() query: GetChannelsQueryDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._getChannelsUseCase.execute({
      search: query.search,
      userId: req.user.sub,
      page: query.page as number,
      limit: query.limit as number,
    });
  }
}
