import { Provider } from '@nestjs/common';
import { GetAuctionAnalyticsUsecase } from '../application/usecases';
import { GET_AUCTION_ANALYTICS_USECASE_TOKEN } from '../application/tokens';
import { IChannelRepo } from '@/modules/channels/application/ports';
import { CHANNEL_REPO_TOKEN } from '@/modules/channels/application/token';
import { ILiveRepo } from '@/modules/live/application/ports';
import { LIVE_REPOSITORY_TOKEN } from '@/modules/live/application/tokens';
import { ICategoryRepo } from '@/modules/category/application/ports';
import { CATEGORY_REPO_TOKEN } from '@/modules/category/application/token';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';

export const advertiserAnalyticsProvider: Provider[] = [
  {
    provide: GET_AUCTION_ANALYTICS_USECASE_TOKEN,
    useFactory: (
      liveRepo: ILiveRepo,
      channelRepo: IChannelRepo,
      categoryRepo: ICategoryRepo,
      storageService: IStorageService,
    ) => {
      return new GetAuctionAnalyticsUsecase(
        liveRepo,
        channelRepo,
        categoryRepo,
        storageService,
      );
    },
    inject: [
      LIVE_REPOSITORY_TOKEN,
      CHANNEL_REPO_TOKEN,
      CATEGORY_REPO_TOKEN,
      STORAGE_SERVICE_PORT_TOKEN,
    ],
  },
];
