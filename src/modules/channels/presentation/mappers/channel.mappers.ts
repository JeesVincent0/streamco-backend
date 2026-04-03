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
}
