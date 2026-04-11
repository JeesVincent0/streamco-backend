export interface CreateLiveInput {
  title: string;
  channelId: string;
  rtcRoomId: string;

  description?: string;
  categoryId?: string;
  thumbnailUrl?: string;
  scheduledAt?: Date;
  expectedDuration?: number;
}
