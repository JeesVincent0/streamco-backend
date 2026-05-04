import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ROUTES } from '@/shared/constants/routes';
import { SCOPE } from '@/modules/auth-security/domain';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';
import { GET_AUCTION_ANALYTICS_USECASE_TOKEN } from '../../application/tokens';
import type { IGetAuctionAnalyticsUsecase } from '../../application/port';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';

@Controller(ROUTES.ADVERTISER.ROOT)
@UseGuards(AccessTokenGuard, ActiveUserGuard, ScopeGuard)
export class AdvertiserAnalyticsController {
  constructor(
    @Inject(GET_AUCTION_ANALYTICS_USECASE_TOKEN)
    private readonly _getAuctionAnalyticsUsecase: IGetAuctionAnalyticsUsecase,
  ) {}

  @Get(
    `${ROUTES.ADVERTISER.SCHEDULED_LIVE}/${ROUTES.COMMON.ID}/${ROUTES.AUCTION.ANALYTICS}`,
  )
  @Scopes(SCOPE.USER_READ)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS_MESSAGE.AUCTION_ANALYTICS_DATA_FETCHED_SUCCESSFULLY)
  getAuctionAnalytics(@Param('id') liveId: string) {
    return this._getAuctionAnalyticsUsecase.execute({ liveId });
  }
}
