import {
  LIVE_REPOSITORY_TOKEN,
  CATEGORY_CHECKER_TOKEN,
  DAY_LIVES_USE_CASE_TOKEN,
  MONTHLY_LIVES_USE_CASE_TOKEN,
  SCHEDULE_LIVE_USE_CASE_TOKEN,
} from '../application/tokens';

import { ILogger, LOGGER_TOKEN } from '@/shared/logger';
import { ScheduleLiveUseCase } from '../application/usecase';
import { ICategoryChecker, ILiveRepo } from '../application/ports';
import { LiveRepositoryMongooseImpl } from '../infrastructure/repository';
import { DayLivesUsecase, MonthlyLivesUsecase } from '../application/usecase';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export const channelLiveProviders = [
  {
    provide: SCHEDULE_LIVE_USE_CASE_TOKEN,
    useFactory: (
      liveRepo: ILiveRepo,
      categoryChecker: ICategoryChecker,
      thumbnailStorage: IStorageService,
      logger: ILogger,
    ) => {
      return new ScheduleLiveUseCase(
        liveRepo,
        categoryChecker,
        thumbnailStorage,
        logger,
      );
    },
    inject: [
      LIVE_REPOSITORY_TOKEN,
      CATEGORY_CHECKER_TOKEN,
      STORAGE_SERVICE_PORT_TOKEN,
      LOGGER_TOKEN,
    ],
  },

  {
    provide: MONTHLY_LIVES_USE_CASE_TOKEN,
    useFactory: (liveRepo: ILiveRepo) => {
      return new MonthlyLivesUsecase(liveRepo);
    },
    inject: [LIVE_REPOSITORY_TOKEN],
  },

  {
    provide: DAY_LIVES_USE_CASE_TOKEN,
    useFactory: (liveRepo: ILiveRepo) => {
      return new DayLivesUsecase(liveRepo);
    },
    inject: [LIVE_REPOSITORY_TOKEN],
  },

  {
    provide: LIVE_REPOSITORY_TOKEN,
    useClass: LiveRepositoryMongooseImpl,
  },
];
