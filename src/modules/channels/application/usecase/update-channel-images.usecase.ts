import { UpdateChannelImagesInput } from '../inputs';
import { IUpdateChannelImageUsecase } from '../ports';
import { UpdateChannelImagesOutput } from '../output';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class UpdateChannelImageUsecase implements IUpdateChannelImageUsecase {
  constructor(private readonly _s3Service: IStorageService) {}

  async execute(
    input: UpdateChannelImagesInput,
  ): Promise<UpdateChannelImagesOutput> {
    let profileImageUrl: string | undefined = undefined;
    let backgroundBannerUrl: string | undefined = undefined;

    if (input.profileImage) {
      profileImageUrl = await this._s3Service.uploadBase64(
        input.profileImage,
        'profiles',
        `${input.channelId}-profile.jpg`,
      );
    }

    if (input.backgroundBanner) {
      backgroundBannerUrl = await this._s3Service.uploadBase64(
        input.backgroundBanner,
        'banners',
        `${input.channelId}-banner.jpg`,
      );
    }

    return { profileImageUrl, backgroundBannerUrl };
  }
}
