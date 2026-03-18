import { S3Service } from '@/shared/infrastructure/storage';
import { UpdateChannelImagesPort } from '../application/ports';
import {
  CREATE_CHANNEL_USE_CASE,
  UPDATE_CHANNEL_IMAGES_USE_CASE,
} from '../application/token';
import {
  CreateChannelUsecase,
  UpdateChannelImageUsecase,
} from '../application/usecase';

export const channelProviders = [
  {
    provide: CREATE_CHANNEL_USE_CASE,
    useFactory: (updateImage: UpdateChannelImagesPort) => {
      return new CreateChannelUsecase(updateImage);
    },
    inject: [UPDATE_CHANNEL_IMAGES_USE_CASE],
  },

  {
    provide: UPDATE_CHANNEL_IMAGES_USE_CASE,
    useFactory: (s3Service: S3Service) => {
      return new UpdateChannelImageUsecase(s3Service);
    },
    inject: [S3Service],
  },
];
