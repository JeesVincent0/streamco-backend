import {
  CATEGORY_CHECKER_TOKEN,
  LIVE_REPOSITORY_TOKEN,
  MONTHLY_LIVES_USE_CASE_TOKEN,
  SCHEDULE_LIVE_USE_CASE_TOKEN,
} from '../application/tokens';

import { ICategoryChecker, ILiveRepo } from '../application/ports';
import { ScheduleLiveUseCase } from '../application/usecase';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { ILogger, LOGGER_TOKEN } from '@/shared/logger';
import { LiveRepositoryMongooseImpl } from '../infrastructure/repository';
import { MonthlyLivesUsecase } from '../application/usecase/monthly-lives.usecase';

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
    provide: LIVE_REPOSITORY_TOKEN,
    useClass: LiveRepositoryMongooseImpl,
  },
];
