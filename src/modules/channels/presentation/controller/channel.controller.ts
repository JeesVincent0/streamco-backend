import {
  Get,
  Param,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import {
  ChannelOwnershipGuard,
  IsChannelActiveGuard,
} from '../../infrastructure/guards';

import { ROUTES } from '@/shared/constants/routes';
import { ChannelResponseMappers } from '../mappers';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { type IGetBaseChannelUseCase } from '../../application/ports';
import { AccessTokenGuard } from '@/modules/auth-security/presentation';
import { GET_BASE_CHANNEL_USE_CASE_TOKEN } from '../../application/token';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

@Controller(ROUTES.CHANNEL.ROOT)
@UseGuards(
  AccessTokenGuard,
  ActiveUserGuard,
  ChannelOwnershipGuard,
  IsChannelActiveGuard,
)
export class ChannelController {
  constructor(
    @Inject(GET_BASE_CHANNEL_USE_CASE_TOKEN)
    private readonly _getBaseChannelUseCase: IGetBaseChannelUseCase,

    @Inject(STORAGE_SERVICE_PORT_TOKEN)
    private readonly _s3Service: IStorageService,
  ) {}

  @Get(ROUTES.COMMON.ID)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.BASE_CHANNEL_DATA_FETCHED_SUCCESSFULLY)
  async getBaseChannel(@Param('id') channelId: string) {
    const result = await this._getBaseChannelUseCase.execute({ channelId });
    const channel = await ChannelResponseMappers.toChannel(
      result,
      this._s3Service,
    );
    return channel;
  }
}
