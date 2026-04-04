import { IChannelRepo } from '../application/ports';
import { IGetAllChannelsRepository } from '../application/ports/admin/get-all-channels.repository.port';
import {
  CHANNEL_REPO_TOKEN,
  GET_ALL_CHANNELS_REPO_TOKEN,
  GET_ALL_CHANNELS_USE_CASE_TOKEN,
  GET_CHANNEL_USE_CASE_TOKEN,
  UPDATE_CHANNEL_STATUS_USE_CASE_TOKEN,
} from '../application/token';
import {
  GetAllChannelsUseCase,
  GetChannelUseCase,
  UpdateChannelStatusUseCase,
} from '../application/usecase';
import { GetAllChannelsRepositoryImpl } from '../infrastructure/repository';

export const adminChannelProviders = [
  {
    provide: GET_ALL_CHANNELS_USE_CASE_TOKEN,
    useFactory: (getAllChannels: IGetAllChannelsRepository) => {
      return new GetAllChannelsUseCase(getAllChannels);
    },
    inject: [GET_ALL_CHANNELS_REPO_TOKEN],
  },

  {
    provide: UPDATE_CHANNEL_STATUS_USE_CASE_TOKEN,
    useFactory: (channelRepo: IChannelRepo) => {
      return new UpdateChannelStatusUseCase(channelRepo);
    },
    inject: [CHANNEL_REPO_TOKEN],
  },

  {
    provide: GET_CHANNEL_USE_CASE_TOKEN,
    useFactory: (channelRepo: IChannelRepo) => {
      return new GetChannelUseCase(channelRepo);
    },
    inject: [CHANNEL_REPO_TOKEN],
  },

  {
    provide: GET_ALL_CHANNELS_REPO_TOKEN,
    useClass: GetAllChannelsRepositoryImpl,
  },
];
