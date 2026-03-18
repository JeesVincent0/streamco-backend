export interface CreateChannelInput {
  channelName: string;
  channelId: string;
  userId: string;
  bio?: string;
  profileImageUrl?: string;
  backgroundBannerUrl?: string;
}
