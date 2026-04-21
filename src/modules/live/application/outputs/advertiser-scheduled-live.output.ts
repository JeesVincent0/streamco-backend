import { IPagination } from '@/shared/application/output';

export interface IAdvertiserScheduledLiveOutput {
  scheduledLives: IScheduledLives[];
  pagination: IPagination;
}

export interface IScheduledLives {
  id: string;
  title: string;
  category: string;
  scheduledAt?: Date;
  channelName: string;
}
