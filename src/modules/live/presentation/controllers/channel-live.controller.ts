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
} from '../dto';

import type {
  IDayLivesUsecase,
  IMonthlyLivesUsecase,
  IScheduleLiveUseCase,
} from '../../application/ports';

import {
  DAY_LIVES_USE_CASE_TOKEN,
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
import { LiveResponseMappers } from '../mappers';
import { Live } from '../../domain/entity';

@Controller(ROUTES.LIVE.ROOT)
@UseGuards(AccessTokenGuard, ActiveUserGuard, IsChannelActiveGuard)
export class ChannelLiveController {
  constructor(
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
    const result = await this._monthlyLivesUseCase.execute({
      channelId,
      month: queryArgs.month,
      year: queryArgs.year,
    });

    return result;
  }

  @Get(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.DAY}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.MONTHLY_LIVES_DATA_FATECHED_SUCCESSFULLY)
  async getDayLives(
    @Query() queryArgs: DayLivesQueryDto,
    @Param('id') channelId: string,
  ) {
    const result = await this._dayLivesUsecase.execute({
      channelId,
      date: queryArgs.date,
    });

    const responseData = result.map((live: Live & { expectedEndAt: Date }) =>
      LiveResponseMappers.toDayLivesResponse(live),
    );

    return responseData;
  }

  @Get(`${ROUTES.LIVE.SCHEDULED}/${ROUTES.COMMON.ID}`)
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.USER_READ)
  @ResponseMessage(SUCCESS_MESSAGE.SCHEDULED_LIVE_FETCHED_SUCCESSFULLY)
  getSchedulesLive(@Param('id') channelId: string) {
    console.log(
      'This is channelId from getScheduledLive controller: ',
      channelId,
    );
    const dummyScheduledLives = [
      {
        id: '1',
        title:
          'Introduction to React Server Componentsdddddd dddddddddd dddddddd dddddddd ddddddd dddddddd dddddd',
        date: '2024-05-20',
        time: '10:00 AM',
        status: 'SCHEDULED',
      },
      {
        id: '2',
        title: 'Advanced Tailwind CSS Techniques',
        date: '2024-05-21',
        time: '02:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '3',
        title: 'Next.js 15 Deep Dive',
        date: '2024-05-22',
        time: '11:30 AM',
        status: 'CANCELED',
      },
      {
        id: '4',
        title: 'State Management in 2024',
        date: '2024-05-23',
        time: '09:00 AM',
        status: 'SCHEDULED',
      },
      {
        id: '5',
        title: 'Building accessible UI components',
        date: '2024-05-24',
        time: '04:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '6',
        title: 'TypeScript 5.4 Features',
        date: '2024-05-25',
        time: '01:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '7',
        title: 'Testing with Vitest and Playwright',
        date: '2024-05-26',
        time: '10:30 AM',
        status: 'SCHEDULED',
      },
      {
        id: '8',
        title: 'Career Growth for Frontend Devs',
        date: '2024-05-27',
        time: '05:00 PM',
        status: 'CANCELED',
      },
      {
        id: '9',
        title: 'Micro-frontends Architecture',
        date: '2024-05-28',
        time: '12:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '10',
        title: 'Performance Optimization Tips',
        date: '2024-05-29',
        time: '03:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '11',
        title: 'GraphQL vs REST in 2024',
        date: '2024-06-01',
        time: '11:00 AM',
        status: 'SCHEDULED',
      },
      {
        id: '12',
        title: 'Deploying with Vercel and Docker',
        date: '2024-06-02',
        time: '09:30 AM',
        status: 'SCHEDULED',
      },
      {
        id: '13',
        title: 'Mastering Framer Motion',
        date: '2024-06-03',
        time: '02:30 PM',
        status: 'SCHEDULED',
      },
      {
        id: '14',
        title: 'The Future of WebAssembly',
        date: '2024-06-04',
        time: '06:00 PM',
        status: 'SCHEDULED',
      },
      {
        id: '15',
        title: 'AI Integration in Web Apps',
        date: '2024-06-05',
        time: '10:00 AM',
        status: 'CANCELED',
      },
      {
        id: '16',
        title: 'Styling with CSS-in-JS vs Modules',
        date: '2024-06-06',
        time: '01:15 PM',
        status: 'SCHEDULED',
      },
      {
        id: '17',
        title: 'Understanding React Hydration',
        date: '2024-06-07',
        time: '04:45 PM',
        status: 'SCHEDULED',
      },
      {
        id: '18',
        title: 'Server-side Rendering Explained',
        date: '2024-06-08',
        time: '11:00 AM',
        status: 'SCHEDULED',
      },
      {
        id: '19',
        title: 'Working with Turborepo',
        date: '2024-06-09',
        time: '08:00 AM',
        status: 'SCHEDULED',
      },
      {
        id: '20',
        title: 'Clean Code Principles for JS',
        date: '2024-06-10',
        time: '03:30 PM',
        status: 'SCHEDULED',
      },
    ];

    return {
      scheduledLives: dummyScheduledLives.slice(0, 10),
      pagination: {
        totalItems: 20,
        totalPages: 2,
        currentPage: 1,
        limit: 10,
      },
    };
  }
}
