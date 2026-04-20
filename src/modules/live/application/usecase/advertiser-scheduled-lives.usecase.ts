import { IAdvertiserScheduledLivesInput } from '../inputs';
import { IAdvertiserScheduledLiveOutput } from '../outputs';
import { IAdvertiserScheduledLivesUsecase, ILiveRepo } from '../ports';

export class AdvertiserScheduledLivesUsecase implements IAdvertiserScheduledLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(
    input: IAdvertiserScheduledLivesInput,
  ): Promise<IAdvertiserScheduledLiveOutput> {
    console.log('This is from advertiser usecase', input);
    await this._liveRepo.findById('adsfasf');
    const scheduledLives = [
      {
        id: 'live_001',
        title: 'Morning Tech Talk & Gadget Review',
        category: 'Technology',
        scheduledAt: '2026-04-22T09:00:00Z',
        channelName: 'Tech Insider',
      },
      {
        id: 'live_002',
        title: 'Q&A: Building Scalable Web Apps',
        category: 'Software Development',
        scheduledAt: '2026-04-25T14:30:00Z',
        channelName: 'Dev Mastery',
      },
      {
        id: 'live_003',
        title: 'Weekly Gaming Highlights',
        category: 'Gaming',
        scheduledAt: '2026-04-21T18:00:00Z',
        channelName: 'Pro Gamers Hub',
      },
      {
        id: 'live_004',
        title: 'Cooking Masterclass: Italian Cuisine',
        category: 'Food & Drink',
        scheduledAt: '2026-04-24T11:00:00Z',
        channelName: "Chef's Kitchen",
      },
    ];
    return {
      scheduledLives,
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 5,
      },
    };
  }
}
