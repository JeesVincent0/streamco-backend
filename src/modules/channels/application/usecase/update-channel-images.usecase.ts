import { S3Service } from '@/shared/infrastructure/storage';
import { UpdateChannelImagesInput } from '../inputs';
import { UpdateChannelImagesPort } from '../ports';
import { UpdateChannelImagesOutput } from '../output';

export class UpdateChannelImageUsecase implements UpdateChannelImagesPort {
  constructor(private readonly _s3Service: S3Service) {}

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
