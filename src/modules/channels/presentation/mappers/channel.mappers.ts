import { GetChannelOutPut } from '../../application/output';
import { Channel } from '../../domain/entity';

export class ChannelResponseMappers {
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

  static toChannel(channelDoc: Channel): GetChannelOutPut {
    return {
      bio: channelDoc.bio,
      userId: channelDoc.userId,
      status: channelDoc.status,
      isLive: channelDoc.isLive,
      channelId: channelDoc.channelId,
      createdAt: channelDoc.createdAt,
      channelName: channelDoc.channelName,
      profileImageUrl: channelDoc.profileImageUrl,
      subscribersCount: channelDoc.subscribersCount,
      backgroundBannerUrl: channelDoc.backgroundBannerUrl,
    };
  }
}
