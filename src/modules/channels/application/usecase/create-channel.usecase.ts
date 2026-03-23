import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateChannelInput } from '../inputs';
import type {
  IChannelRepo,
  ICreateChannelUseCase,
  IUpdateChannelImageUsecase,
} from '../ports';
import { Channel } from '../../domain/entity';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class CreateChannelUsecase implements ICreateChannelUseCase {
  constructor(
    private readonly _updateImages: IUpdateChannelImageUsecase,
    private readonly _channelRepo: IChannelRepo,
  ) {}
  async execute(input: CreateChannelInput): Promise<SucceessResType> {
    const channel = await this._channelRepo.findByChannelId(input.channelId);
    if (channel) {
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_CHANNEL_ID);
    }
    const { profileImageUrl, backgroundBannerUrl } =
      await this._updateImages.execute({
        backgroundBanner: input.backgroundBannerUrl,
        profileImage: input.profileImageUrl,
        channelId: input.channelId,
      });

    const channelEnity = Channel.create({
      channelId: input.channelId,
      channelName: input.channelName,
      profileImageUrl: profileImageUrl,
      backgroundBannerUrl: backgroundBannerUrl,
      userId: input.userId,
      bio: input.bio,
    });

    await this._channelRepo.save(channelEnity);

    return {
      status: 'success',
      message: 'Channel created successfully',
    };
  }
}
