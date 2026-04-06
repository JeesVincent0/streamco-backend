import { CHANNEL_STATUS } from '../../domain/enums';

export interface GetBaseChannelOutPut {
  bio: string;
  status: CHANNEL_STATUS;
  userId: string;
  isLive: boolean;
  createdAt: Date;
  channelId: string;
  channelName: string;
  profileImageUrl?: string;
  subscribersCount: number;
  backgroundBannerUrl?: string;
}
