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

import { CHANNEL_STATUS } from '../../domain/enums';
import { ChannelResponseMappers } from '../mappers';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

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

    @Inject(STORAGE_SERVICE_PORT_TOKEN)
    private readonly _s3Service: IStorageService,
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

    return ChannelResponseMappers.toChannel(channelEnity, this._s3Service);
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
