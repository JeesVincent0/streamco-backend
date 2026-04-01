import { GET_ALL_CHANNELS_USE_CASE_TOKEN } from '../application/token';
import { GetAllChannelsUseCase } from '../application/usecase';

export const adminChannelProviders = [
  {
    provide: GET_ALL_CHANNELS_USE_CASE_TOKEN,
    useFactory: () => {
      return new GetAllChannelsUseCase();
    },
    inject: [],
  },
];
