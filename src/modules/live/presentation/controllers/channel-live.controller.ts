import {
  Get,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { ROUTES } from '@/shared/constants/routes';
import { ResponseMessage } from '@/shared/decorators';
import { SCOPE } from '@/modules/auth-security/domain';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { IsChannelActiveGuard } from '@/modules/channels/infrastructure/guards';
import { AccessTokenGuard, Scopes } from '@/modules/auth-security/presentation';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';

@Controller(ROUTES.LIVE.ROOT)
@UseGuards(AccessTokenGuard, ActiveUserGuard, IsChannelActiveGuard)
export class ChannelLiveController {
  constructor() {}

  @Post(ROUTES.LIVE.SCHEDULE)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_WRITE)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_SUCCESSFULLY)
  scheduleLive() {}

  @Get(`${ROUTES.LIVE.SCHEDULED}/${ROUTES.COMMON.ID}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_FETCHED_SUCCESSFULLY)
  getSchedulesLive() {}
}
