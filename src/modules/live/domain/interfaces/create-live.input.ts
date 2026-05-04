import { Duration } from '../value-objects';

export interface CreateLiveInput {
  title: string;
  channelId: string;
  scheduledAt: Date;
  categoryId: string;
  description: string;
  thumbnailUrl: string;
  expectedDuration: Duration;
}
