import {
  CHANNEL_REPO_TOKEN,
  GET_BASE_CHANNEL_USE_CASE_TOKEN,
} from '../application/token';

import { IChannelRepo } from '../application/ports';
import { GetBaseChannelUseCase } from '../application/usecase';

export const channelProviders = [
  {
    provide: GET_BASE_CHANNEL_USE_CASE_TOKEN,
    useFactory: (channelRepo: IChannelRepo) => {
      return new GetBaseChannelUseCase(channelRepo);
    },
    inject: [CHANNEL_REPO_TOKEN],
  },
];
