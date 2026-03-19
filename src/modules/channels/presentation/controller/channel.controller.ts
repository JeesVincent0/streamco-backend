import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Inject,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { CreateChannelDto, GetChannelsQueryDto } from '../dto';
import type {
  CreateChannelPort,
  GetChannelsPort,
} from '../../application/ports';
import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import { SCOPE } from '@/modules/auth-security/domain';
import {
  CREATE_CHANNEL_USE_CASE,
  GET_CHANNELS_PORT,
} from '../../application/token';
import { type RequestWithUserInterface } from '@/shared/interfaces';

@Controller('channels')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class ChannelController {
  constructor(
    @Inject(CREATE_CHANNEL_USE_CASE)
    private readonly _createChannelUseCase: CreateChannelPort,

    @Inject(GET_CHANNELS_PORT)
    private readonly _getChannelsUseCase: GetChannelsPort,
  ) {}

  @Post('create')
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
      page: query.page as number,
      limit: query.limit as number,
      search: query.search,
      userId: req.user.sub,
    });
  }
}
