import {
  Get,
  Query,
  Inject,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';

import { ROUTES } from '@/shared/constants/routes';
import { ResponseMessage } from '@/shared/decorators';
import { SCOPE } from '@/modules/auth-security/domain';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import type { IAdvertiserScheduledLivesUsecase } from '../../application/ports';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';
import { ADVERTISER_SCHEDULED_LIVE_USE_CASE_TOKEN } from '../../application/tokens';
import { AdvertiserScheduledLivesDto } from '../dto/advertiser-live.dto.ts/get-scheduled-lives.dto';

@Controller(ROUTES.ADVERTISER.ROOT)
@UseGuards(AccessTokenGuard, ScopeGuard, ActiveUserGuard)
export class AdvertiserLiveController {
  constructor(
    @Inject(ADVERTISER_SCHEDULED_LIVE_USE_CASE_TOKEN)
    private readonly _getScheduledLives: IAdvertiserScheduledLivesUsecase,
  ) {}

  @Get(`${ROUTES.ADVERTISER.SCHEDULED_LIVE}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_FETCHED_SUCCESSFULLY)
  getScheduledLives(@Query() queryArgs: AdvertiserScheduledLivesDto) {
    return this._getScheduledLives.execute({
      limit: queryArgs.limit,
      page: queryArgs.page,
      order: queryArgs.order,
      search: queryArgs.search,
      sortBy: queryArgs.sortBy,
      isAuctionStarted: queryArgs.isAuctionStarted,
    });
  }
}
