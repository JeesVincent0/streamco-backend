export interface IGetAuctionAnalyticsOutput {
  id: string;
  date: Date;
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
  liveSubscribedChannel: number;
}
