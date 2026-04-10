import { Channel } from '../../domain/entity';
import { GetChannelOutPut } from '../../application/output';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class ChannelResponseMappers {
  constructor() {}
  static toChannels(channelDoc: Channel[]) {
    return channelDoc.map((doc) => {
      return {
        channelId: doc.channelId,
        channelName: doc.channelName,
        subscribersCount: doc.subscribersCount,
        isLive: doc.isLive,
        status: doc.status,
      };
    });
  }

  static async toChannel(
    channelDoc: Channel,
    s3Service: IStorageService,
  ): Promise<GetChannelOutPut> {
    const [profileImageUrl, backgroundBannerUrl] = await Promise.all([
      channelDoc.profileImageUrl
        ? s3Service.getSignedViewUrl(channelDoc.profileImageUrl)
        : null,
      channelDoc.backgroundBannerUrl
        ? s3Service.getSignedViewUrl(channelDoc.backgroundBannerUrl)
        : null,
    ]);

    return {
      bio: channelDoc.bio,
      userId: channelDoc.userId,
      status: channelDoc.status,
      isLive: channelDoc.isLive,
      channelId: channelDoc.channelId,
      createdAt: channelDoc.createdAt,
      channelName: channelDoc.channelName,
      profileImageUrl,
      subscribersCount: channelDoc.subscribersCount,
      backgroundBannerUrl,
    };
  }
}
