import { S3Service } from '@/shared/infrastructure/storage';
import { ChannelRepoPort, UpdateChannelImagesPort } from '../application/ports';
import {
  CHANNEL_REPO_PORT,
  CREATE_CHANNEL_USE_CASE,
  UPDATE_CHANNEL_IMAGES_USE_CASE,
} from '../application/token';
import {
  CreateChannelUsecase,
  UpdateChannelImageUsecase,
} from '../application/usecase';
import { ChannelRepository } from '../infrastructure/repository/channel.repository';

export const channelProviders = [
  {
    provide: CREATE_CHANNEL_USE_CASE,
    useFactory: (
      updateImage: UpdateChannelImagesPort,
      channelRepo: ChannelRepoPort,
    ) => {
      return new CreateChannelUsecase(updateImage, channelRepo);
    },
    inject: [UPDATE_CHANNEL_IMAGES_USE_CASE, CHANNEL_REPO_PORT],
  },

  {
    provide: UPDATE_CHANNEL_IMAGES_USE_CASE,
    useFactory: (s3Service: S3Service) => {
      return new UpdateChannelImageUsecase(s3Service);
    },
    inject: [S3Service],
  },

  {
    provide: CHANNEL_REPO_PORT,
    useClass: ChannelRepository,
  },
];
