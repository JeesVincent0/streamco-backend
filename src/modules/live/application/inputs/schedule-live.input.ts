import { VISIBILITY } from '../../domain/enums';
import { Duration, Time } from '../../domain/value-objects';

export interface ScheduleLiveInput {
  date: Date;
  time: Time;
  duration: Duration;
  title: string;
  visibility: VISIBILITY;
  categoryId: string;
  description: string;
  thumbnail: string;
  channelId: string;
}
