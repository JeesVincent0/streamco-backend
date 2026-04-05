import { ICacheBaseRepo } from '@/shared/application/ports';
import { IChannelRepo } from '../application/ports';
import {
  CHANNEL_REPO_TOKEN,
  GET_BASE_CHANNEL_USE_CASE_TOKEN,
} from '../application/token';
import { GetBaseChannelUseCase } from '../application/usecase';
import { CHACHE_REPO_TOKEN } from '@/shared/infrastructure/cache/token';

export const channelProviders = [
  {
    provide: GET_BASE_CHANNEL_USE_CASE_TOKEN,
    useFactory: (channelRepo: IChannelRepo, chacheRepo: ICacheBaseRepo) => {
      return new GetBaseChannelUseCase(channelRepo, chacheRepo);
    },
    inject: [CHANNEL_REPO_TOKEN, CHACHE_REPO_TOKEN],
  },
];
