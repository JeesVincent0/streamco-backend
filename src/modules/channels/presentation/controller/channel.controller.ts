import {
  Get,
  Param,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ROUTES } from '@/shared/constants/routes';
import { ResponseMessage } from '@/shared/decorators';
import { ChannelOwnershipGuard } from '../../infrastructure/guards';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import type { IGetBaseChannelUseCase } from '../../application/ports';
import { AccessTokenGuard } from '@/modules/auth-security/presentation';
import { GET_BASE_CHANNEL_USE_CASE_TOKEN } from '../../application/token';

@Controller(ROUTES.CHANNEL.ROOT)
@UseGuards(AccessTokenGuard, ChannelOwnershipGuard)
export class ChannelController {
  constructor(
    @Inject(GET_BASE_CHANNEL_USE_CASE_TOKEN)
    private readonly _getBaseChannelUseCase: IGetBaseChannelUseCase,
  ) {}

  @Get(ROUTES.COMMON.ID)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.BASE_CHANNEL_DATA_FETCHED_SUCCESSFULLY)
  async getBaseChannel(@Param('id') channelId: string) {
    return await this._getBaseChannelUseCase.execute({ channelId });
  }
}
