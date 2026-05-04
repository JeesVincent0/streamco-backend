import { VISIBILITY } from '../../domain/enums';

export interface ScheduleLiveInput {
  date: Date;
  time: string;
  title: string;
  duration: string;
  thumbnail: string;
  channelId: string;
  scheduledAt: Date;
  categoryId: string;
  description: string;
  visibility: VISIBILITY;
}
