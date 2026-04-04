import { IChannelRepo, IUpdateChannelImageUsecase } from '../application/ports';
import {
  CHANNEL_REPO_TOKEN,
  CREATE_CHANNEL_USE_CASE_TOKEN,
  GET_CHANNELS_USE_CASE_TOKEN,
  UPDATE_CHANNEL_IMAGES_USE_CASE,
} from '../application/token';
import {
  CreateChannelUsecase,
  GetChannelsUsecase,
  UpdateChannelImageUsecase,
} from '../application/usecase';
import { ChannelRepository } from '../infrastructure/repository/channel.repository';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';

export const userChannelProviders = [
  {
    provide: CREATE_CHANNEL_USE_CASE_TOKEN,
    useFactory: (
      updateImage: IUpdateChannelImageUsecase,
      channelRepo: IChannelRepo,
    ) => {
      return new CreateChannelUsecase(updateImage, channelRepo);
    },
    inject: [UPDATE_CHANNEL_IMAGES_USE_CASE, CHANNEL_REPO_TOKEN],
  },

  {
    provide: UPDATE_CHANNEL_IMAGES_USE_CASE,
    useFactory: (s3Service: IStorageService) => {
      return new UpdateChannelImageUsecase(s3Service);
    },
    inject: [STORAGE_SERVICE_PORT_TOKEN],
  },

  {
    provide: CHANNEL_REPO_TOKEN,
    useClass: ChannelRepository,
  },

  {
    provide: GET_CHANNELS_USE_CASE_TOKEN,
    useFactory: (channelRepo: IChannelRepo) => {
      return new GetChannelsUsecase(channelRepo);
    },
    inject: [CHANNEL_REPO_TOKEN],
  },
];
