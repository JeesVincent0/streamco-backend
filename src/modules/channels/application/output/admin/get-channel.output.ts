import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';

export interface GetChannelOutPut {
  bio: string;
  userId: string;
  isLive: boolean;
  createdAt: Date;
  channelId: string;
  channelName: string;
  status: CHANNEL_STATUS;
  profileImageUrl?: string | null;
  subscribersCount: number;
  backgroundBannerUrl?: string | null;
}
