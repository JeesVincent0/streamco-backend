export interface IGetAuctionAnalyticsOutput {
  id: string;
  date: Date;
  time: string;
  title: string;
  category: string;
  duration: string;
  avgViewers: number;
  avgBidPrice: number;
  channelName: string;
  subscribers: number;
  lastSponsor: string;
  thumbnailUrl: string;
  profileImageUrl: string;
  liveSubscribedLive: number;
  liveSubscribedChannel: number;
}
