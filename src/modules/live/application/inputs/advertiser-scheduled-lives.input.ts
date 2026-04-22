export interface IAdvertiserScheduledLivesInput {
  page: number;
  limit: number;
  sortBy?: 'createdAt' | 'scheduledAt' | 'title' | 'category';
  order?: 'desc' | 'asc';
  search?: string;
  isAuctionStarted?: boolean;
}
