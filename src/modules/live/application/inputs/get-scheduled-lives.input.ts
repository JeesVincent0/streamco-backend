import { LIVESTATUS } from '../../domain/enums';

export interface IGetScheduledLivesInput {
  channelId: string;
  page: number;
  limit: number;
  sortBy?: 'createdAt' | 'time' | 'title';
  order?: 'desc' | 'asc';
  status?: LIVESTATUS;
  search?: string;
}
