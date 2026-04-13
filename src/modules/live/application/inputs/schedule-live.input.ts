import { VISIBILITY } from '../../domain/enums';

export interface ScheduleLiveInput {
  date: Date;
  time: string;
  duration: string;
  title: string;
  visibility: VISIBILITY;
  categoryId: string;
  description: string;
  thumbnail: string;
  channelId: string;
}
