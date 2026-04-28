import {
  Scopes,
  ScopeGuard,
  AccessTokenGuard,
} from '@/modules/auth-security/presentation';

import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ROUTES } from '@/shared/constants/routes';
import { SCOPE } from '@/modules/auth-security/domain';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';

@Controller(ROUTES.ADVERTISER.ROOT)
@UseGuards(AccessTokenGuard, ActiveUserGuard, ScopeGuard)
export class AdvertiserAnalyticsController {
  constructor() {}

  @Get(
    `${ROUTES.ADVERTISER.SCHEDULED_LIVE}/${ROUTES.COMMON.ID}/${ROUTES.AUCTION.ANALYTICS}`,
  )
  @Scopes(SCOPE.USER_READ)
  getAuctionAnalytics(@Param('id') liveId: string) {
    console.log('GetAuctionAnalytics, liveId: ', liveId);
    return {
      id: '1',
      channelName: 'CallMeShazzam TECH',
      avatarUrl: 'https://i.pravatar.cc/150?u=shazzam',
      category: 'Tech',
      date: '25-Jan-2026',
      time: '09:00am',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80',
      title: 'Custom Duty In India | My Experience | be careful!! | Malayalam',
      duration: '1 Hour',
      avgBidPrice: '₹84,500/-',
      liveSubscribedLive: '3456',
      subscribers: '1.45m',
      avgViewers: '53485',
      liveSubscribedChannel: '3456',
      lastSponsor: 'Kalyan Silks',
    };
  }
}
