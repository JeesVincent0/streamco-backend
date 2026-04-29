import { IGetAuctionAnalyticsOutput } from '../../output';

export interface IGetAuctionAnalyticsUsecase {
  execute(input: { liveId: string }): IGetAuctionAnalyticsOutput;
}
