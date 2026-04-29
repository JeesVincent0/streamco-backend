import { IGetAuctionAnalyticsUsecase } from '../port';
import { IGetAuctionAnalyticsOutput } from '../output';
import { Duration } from '@/modules/live/domain/value-objects';

export class GetAuctionAnalyticsUsecase implements IGetAuctionAnalyticsUsecase {
  constructor() {}
  execute(input: { liveId: string }): IGetAuctionAnalyticsOutput {
    console.log('This is input for GetAuctionAnalyticsUsecase: ', input);
    const duration = Duration.create('01:00').getValue();
    console.log(duration);

    return {
      id: '1',
      channelName: 'CallMeShazzam TECH',
      profileImageUrl: 'https://i.pravatar.cc/150?u=shazzam',
      category: 'Tech',
      date: new Date('25-01-2026'),
      time: '09:00am',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80',
      title: 'Custom Duty In India | My Experience | be careful!! | Malayalam',
      duration,
      avgBidPrice: 84500,
      liveSubscribedLive: 3456,
      subscribers: 5000,
      avgViewers: 53485,
      liveSubscribedChannel: 3456,
      lastSponsor: 'Kalyan Silks',
    };
  }
}
