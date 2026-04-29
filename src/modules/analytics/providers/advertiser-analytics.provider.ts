import { Provider } from '@nestjs/common';
import { GetAuctionAnalyticsUsecase } from '../application/usecases';
import { GET_AUCTION_ANALYTICS_USECASE_TOKEN } from '../application/tokens';

export const advertiserAnalyticsProvider: Provider[] = [
  {
    provide: GET_AUCTION_ANALYTICS_USECASE_TOKEN,
    useFactory: () => {
      return new GetAuctionAnalyticsUsecase();
    },
    inject: [],
  },
];
