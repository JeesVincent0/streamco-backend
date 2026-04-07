import {
  Get,
  Body,
  Query,
  Param,
  Patch,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ROUTES } from '@/shared/constants/routes';

// CUSTOM GUARDS
import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';
import { GetChannelsQueryArgsDto } from '../dto';
import { SCOPE } from '@/modules/auth-security/domain';

// INTERFACES
import type {
  IGetChannelUseCase,
  IGetAllChannelsUseCase,
  IUpdateChannelStatusUseCase,
} from '../../application/ports';

// TOKENS
import {
  GET_CHANNEL_USE_CASE_TOKEN,
  GET_ALL_CHANNELS_USE_CASE_TOKEN,
  UPDATE_CHANNEL_STATUS_USE_CASE_TOKEN,
} from '../../application/token';

import { ChannelResponseMappers } from '../mappers';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { CHANNEL_STATUS } from '../../domain/enums';

@Controller(`${ROUTES.ADMIN.ROOT}/${ROUTES.ADMIN.CHANNELS}`)
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminChannelController {
  constructor(
    @Inject(GET_ALL_CHANNELS_USE_CASE_TOKEN)
    private readonly _getAllChannelsUseCase: IGetAllChannelsUseCase,

    @Inject(GET_CHANNEL_USE_CASE_TOKEN)
    private readonly _getChannelUseCase: IGetChannelUseCase,

    @Inject(UPDATE_CHANNEL_STATUS_USE_CASE_TOKEN)
    private readonly _updateChannelStatusUseCase: IUpdateChannelStatusUseCase,
  ) {}

  @Patch(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.STATUS}`)
  @Scopes(SCOPE.ADMIN_WRITE)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.CHANNEL_STATUS_CHANGED_SUCCESSFULLY)
  async changeStatus(
    @Body() body: { status: string },
    @Param('id') id: string,
  ) {
    await this._updateChannelStatusUseCase.execute({
      channelId: id,
      status: body.status as CHANNEL_STATUS,
    });
  }

  @Get(`${ROUTES.COMMON.ID}`)
  @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.CHANNEL_FETCHED_SUCCESSFULLY)
  async getChannel(@Param('id') id: string) {
    const channelEnity = await this._getChannelUseCase.execute({
      channelId: id,
    });

    return ChannelResponseMappers.toChannel(channelEnity);
  }

  @Get()
  @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.CHANNELS_FETCHED_SUCCESSFULLY)
  async getAllChannels(@Query() qeuryArgs: GetChannelsQueryArgsDto) {
    const result = await this._getAllChannelsUseCase.execute({
      page: qeuryArgs.page,
      limit: qeuryArgs.limit,
      order: qeuryArgs.order,
      search: qeuryArgs.search,
      sortBy: qeuryArgs.sortBy,
      isLive: qeuryArgs.isLive,
      status: qeuryArgs.status,
    });

    const data = {
      pagination: {
        page: result.pagination.page,
        limit: result.pagination.limit,
        totalPages: result.pagination.totalPages,
      },
      channels: ChannelResponseMappers.toChannels(result.channels),
    };

    return data;
  }
}
