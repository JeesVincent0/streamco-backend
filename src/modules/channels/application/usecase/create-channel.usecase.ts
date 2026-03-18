import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateChannelInput } from '../inputs';
import type { CreateChannelPort, UpdateChannelImagesPort } from '../ports';
import { Channel } from '../../domain/entity';

export class CreateChannelUsecase implements CreateChannelPort {
  constructor(private readonly _updateImages: UpdateChannelImagesPort) {}
  async execute(input: CreateChannelInput): Promise<SucceessResType> {
    const { profileImageUrl, backgroundBannerUrl } =
      await this._updateImages.execute({
        backgroundBanner: input.backgroundBannerUrl,
        profileImage: input.profileImageUrl,
        channelId: input.channelId,
      });

    const channel = Channel.create({
      channelId: input.channelId,
      channelName: input.channelName,
      profileImageUrl: profileImageUrl,
      backgroundBannerUrl: backgroundBannerUrl,
      userId: input.userId,
      bio: input.bio,
    });

    return {
      status: 'success',
      message: 'Channel created successfully',
    };
  }
}
