import { IGetAuctionAnalyticsOutput } from '../../output';

export interface IGetAuctionAnalyticsUsecase {
  execute(input: { liveId: string }): Promise<IGetAuctionAnalyticsOutput>;
}
