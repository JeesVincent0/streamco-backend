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
import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';
import { GetChannelsQueryArgsDto } from '../dto';
import { SCOPE } from '@/modules/auth-security/domain';
import type {
  IGetAllChannelsUseCase,
  IGetChannelUseCase,
} from '../../application/ports';
import {
  GET_ALL_CHANNELS_USE_CASE_TOKEN,
  GET_CHANNEL_USE_CASE_TOKEN,
} from '../../application/token';
import { ChannelResponseMappers } from '../mappers';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';

@Controller(`${ROUTES.ADMIN.ROOT}/${ROUTES.ADMIN.CHANNELS}`)
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminChannelController {
  constructor(
    @Inject(GET_ALL_CHANNELS_USE_CASE_TOKEN)
    private readonly _getAllChannelsUseCase: IGetAllChannelsUseCase,

    @Inject(GET_CHANNEL_USE_CASE_TOKEN)
    private readonly _getChannelUseCase: IGetChannelUseCase,
  ) {}

  @Patch(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.STATUS}`)
  @Scopes(SCOPE.ADMIN_WRITE)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.CHANNEL_STATUS_CHANGED_SUCCESSFULLY)
  changeStatus(
    @Body() body: { channelId: string; status: string },
    @Param() param: { id: string },
  ) {
    console.log(body, param.id);
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
      sortBy: qeuryArgs.sortBy,
      order: qeuryArgs.order,
      search: qeuryArgs.search,
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
