import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import {
  ScheduleLiveDto,
  DayLivesQueryDto,
  MonthlyLivesQueryDto,
  GetScheduledLivesDto,
} from '../dto';

import type {
  IDayLivesUsecase,
  IMonthlyLivesUsecase,
  IScheduleLiveUseCase,
  IGetScheduledLivesUsecase,
} from '../../application/ports';

import {
  DAY_LIVES_USE_CASE_TOKEN,
  GET_SCHEDULED_LIVE_USE_CASE_TOKEN,
  MONTHLY_LIVES_USE_CASE_TOKEN,
  SCHEDULE_LIVE_USE_CASE_TOKEN,
} from '../../application/tokens';

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
  constructor(
    @Inject(GET_SCHEDULED_LIVE_USE_CASE_TOKEN)
    private readonly _getScheduledLivesUsecase: IGetScheduledLivesUsecase,

    @Inject(SCHEDULE_LIVE_USE_CASE_TOKEN)
    private readonly _scheduleLiveUseCase: IScheduleLiveUseCase,

    @Inject(MONTHLY_LIVES_USE_CASE_TOKEN)
    private readonly _monthlyLivesUseCase: IMonthlyLivesUsecase,

    @Inject(DAY_LIVES_USE_CASE_TOKEN)
    private readonly _dayLivesUsecase: IDayLivesUsecase,
  ) {}

  @Post(`${ROUTES.COMMON.ID}/${ROUTES.LIVE.SCHEDULE}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_WRITE)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_SUCCESSFULLY)
  async scheduleLive(
    @Body() body: ScheduleLiveDto,
    @Param('id') channelId: string,
  ) {
    await this._scheduleLiveUseCase.execute({
      time: body.time,
      date: body.date,
      title: body.title,
      duration: body.duration,
      thumbnail: body.thumbnail,
      visibility: body.visibility,
      categoryId: body.categoryId,
      description: body.description,
      channelId,
    });
  }

  @Get(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.MONTH}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.MONTHLY_LIVES_DATA_FATECHED_SUCCESSFULLY)
  async getMonthlyLives(
    @Query() queryArgs: MonthlyLivesQueryDto,
    @Param('id') channelId: string,
  ) {
    return await this._monthlyLivesUseCase.execute({
      channelId,
      month: queryArgs.month,
      year: queryArgs.year,
    });
  }

  @Get(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.DAY}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.MONTHLY_LIVES_DATA_FATECHED_SUCCESSFULLY)
  async getDayLives(
    @Query() queryArgs: DayLivesQueryDto,
    @Param('id') channelId: string,
  ) {
    return await this._dayLivesUsecase.execute({
      channelId,
      date: queryArgs.date,
    });
  }

  @Get(`${ROUTES.LIVE.SCHEDULED}/${ROUTES.COMMON.ID}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_FETCHED_SUCCESSFULLY)
  async getSchedulesLives(
    @Param('id') channelId: string,
    @Query() queryArgs: GetScheduledLivesDto,
  ) {
    return await this._getScheduledLivesUsecase.execute({
      channelId: channelId,
      order: queryArgs.order,
      search: queryArgs.search,
      sortBy: queryArgs.sortBy,
      status: queryArgs.status,
      page: queryArgs.page as number,
      limit: queryArgs.limit as number,
    });
  }
}
