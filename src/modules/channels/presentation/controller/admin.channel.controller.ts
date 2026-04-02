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
import type { IGetAllChannelsUseCase } from '../../application/ports';
import { GET_ALL_CHANNELS_USE_CASE_TOKEN } from '../../application/token';

@Controller(`${ROUTES.ADMIN.ROOT}/${ROUTES.ADMIN.CHANNELS}`)
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminChannelController {
  constructor(
    @Inject(GET_ALL_CHANNELS_USE_CASE_TOKEN)
    private readonly _getAllChannelsUseCase: IGetAllChannelsUseCase,
  ) {}

  @Patch(`${ROUTES.COMMON.ID}/${ROUTES.COMMON.STATUS}`)
  @Scopes(SCOPE.ADMIN_WRITE)
  @HttpCode(HttpStatus.OK)
  changeStatus(
    @Body() body: { channelId: string; status: string },
    @Param() param: { id: string },
  ) {
    console.log(body, param.id);
    return {
      status: 'success',
      message: 'Status changed',
    };
  }

  @Get(`${ROUTES.COMMON.ID}`)
  @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  getChannel(@Param() id) {
    console.log(id);

    const channel = {
      channelId: 'newchannelid1',
      channelName: 'Code & Chill',
      bio: 'Building the future of the web, one stream at a time. Join me for live coding, tech reviews, and Q&A sessions!',
      backgroundBannerUrl:
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com/channels/banner',
      profileImageUrl:
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com/channels/profile',
      createdAt: '2026-03-18T23:25:56.247+00:00',
      status: 'ACTIVE',
      isLive: true,
      subscribersCount: 1250400,
      userId: 'a4a51dfb-5765-4378-92f8-d75e69a5c040',
    };

    return {
      status: 'success',
      message: 'successfully fetched',
      data: channel,
    };
  }

  @Get()
  @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  getAllChannels(@Query() qeuryArgs: GetChannelsQueryArgsDto) {
    return this._getAllChannelsUseCase.execute({
      page: qeuryArgs.page,
      limit: qeuryArgs.limit,
      sortBy: qeuryArgs.sortBy,
      order: qeuryArgs.order,
      search: qeuryArgs.search,
      isLive: qeuryArgs.isLive,
      status: qeuryArgs.status,
    });
  }
}
