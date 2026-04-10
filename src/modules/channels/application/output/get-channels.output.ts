import { Channel } from '../../domain/entity';

export interface GetChannelsOutput {
  channels: Channel[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
