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
import { ChannelResponseMappers } from '../mappers';
import { ResponseMessage } from '@/shared/decorators';
import { SCOPE } from '@/modules/auth-security/domain';
import { CreateChannelDto, GetChannelsQueryDto } from '../dto';
import { type RequestWithUserInterface } from '@/shared/interfaces';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

@Controller(ROUTES.CHANNEL.CHANNELS)
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserChannelController {
  constructor(
    @Inject(CREATE_CHANNEL_USE_CASE_TOKEN)
    private readonly _createChannelUseCase: ICreateChannelUseCase,

    @Inject(GET_CHANNELS_USE_CASE_TOKEN)
    private readonly _getChannelsUseCase: IGetChannelsUseCase,

    @Inject(STORAGE_SERVICE_PORT_TOKEN)
    private readonly _storageService: IStorageService,
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
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.CHANNELS_FETCHED_SUCCESSFULLY)
  async getChannels(
    @Query() query: GetChannelsQueryDto,
    @Req() req: RequestWithUserInterface,
  ) {
    const result = await this._getChannelsUseCase.execute({
      search: query.search,
      userId: req.user.sub,
      page: query.page as number,
      limit: query.limit as number,
    });

    const channels = await Promise.all(
      result.channels.map((channelEntity) =>
        ChannelResponseMappers.toChannel(channelEntity, this._storageService),
      ),
    );

    return {
      channels,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}
