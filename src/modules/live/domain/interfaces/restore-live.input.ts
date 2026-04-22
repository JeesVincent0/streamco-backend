import { Duration } from '../value-objects';
import { LIVESTATUS, VISIBILITY } from '../enums';

export interface RestoreLive {
  id: string;
  title: string;
  channelId: string;

  status: LIVESTATUS;
  visibility: VISIBILITY;

  viewerCount: number;
  peakViewerCount: number;
  likeCount: number;
  commentCount: number;

  isChatEnabled: boolean;
  isRecordingEnabled: boolean;

  createdAt: Date;
  updatedAt: Date;

  description?: string;
  categoryId?: string;
  thumbnailUrl?: string;

  rtcRoomId?: string;
  scheduledAt?: Date;
  expectedDuration?: Duration;

  startedAt?: Date;
  endedAt?: Date;

  streamUrl?: string;
  playbackUrl?: string;
  recordingUrl?: string;

  isBlocked?: boolean;
  blockedReason?: string;

  duration?: number;
  deletedAt?: Date | null;

  isAuctionAvailable?: boolean;
  auctionStart?: Date;
  auctionEnds?: Date;
}
