import { SCHEDULE_LIVE_USE_CASE_TOKEN } from '../application/tokens';
import { ScheduleLiveUseCase } from '../application/usecase';

export const channelLiveProviders = [
  {
    provide: SCHEDULE_LIVE_USE_CASE_TOKEN,
    useFactory: () => {
      return new ScheduleLiveUseCase();
    },
    inject: [],
  },
];
