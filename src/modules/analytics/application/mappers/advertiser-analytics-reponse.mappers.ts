import { Live } from '@/modules/live/domain/entity';
import { Channel } from '@/modules/channels/domain/entity';
import { Category } from '@/modules/category/domain/entity';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';
import { IGetAuctionAnalyticsOutput } from '../output';

export class AdvertiserReponseMappers {
  static async toAuctionAnalytics(
    channel: Channel,
    category: Category,
    scheduledLive: Live,
    storageService: IStorageService,
  ): Promise<IGetAuctionAnalyticsOutput> {
    const duration = scheduledLive.expectedDuration?.getValue() || '';

    const profileImageUrl = await storageService.getSignedViewUrl(
      channel.profileImageUrl as string,
    );

    const thumbnailUrl = await storageService.getSignedViewUrl(
      scheduledLive.thumbnailUrl as string,
    );

    return {
      profileImageUrl,
      thumbnailUrl,

      duration,
      id: scheduledLive.id,
      category: category.name,
      title: scheduledLive.title,
      date: scheduledLive.scheduledAt as Date,
      channelName: channel.channelName,
      subscribers: channel.subscribersCount,
      avgBidPrice: 84500,
      avgViewers: 53485,
      liveSubscribedChannel: 0,
      lastSponsor: 'Kalyan Silks',
    };
  }
}
