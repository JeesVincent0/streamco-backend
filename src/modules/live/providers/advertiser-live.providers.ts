import { Provider } from '@nestjs/common';
import {
  ADVERTISER_SCHEDULED_LIVE_USE_CASE_TOKEN,
  LIVE_REPOSITORY_TOKEN,
} from '../application/tokens';
import { AdvertiserScheduledLivesUsecase } from '../application/usecase';
import { ILiveRepo } from '../application/ports';

export const advertiserLiveProvider: Provider[] = [
  {
    provide: ADVERTISER_SCHEDULED_LIVE_USE_CASE_TOKEN,
    useFactory: (liveRepo: ILiveRepo) => {
      return new AdvertiserScheduledLivesUsecase(liveRepo);
    },
    inject: [LIVE_REPOSITORY_TOKEN],
  },
];
