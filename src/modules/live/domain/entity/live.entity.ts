import { UniqueIdService } from '@/shared/domain';
import { LIVESTATUS } from '../enums';
import { VISIBILITY } from '../enums';

interface CreateLiveInput {
  title: string;
  channelId: string;
  streamKey: string;

  description?: string;
  categoryId?: string;
  thumbnailUrl?: string;
  scheduledAt?: Date;
}

export class Live {
  private constructor(
    private _id: string,
    private _title: string,
    private _channelId: string,
    private _streamKey: string,

    private _status: LIVESTATUS,
    private _visibility: VISIBILITY,

    private _viewerCount: number,
    private _peakViewerCount: number,
    private _likeCount: number,
    private _commentCount: number,

    private _isChatEnabled: boolean,
    private _isRecordingEnabled: boolean,

    private _createdAt: Date,
    private _updatedAt: Date,

    private _description?: string,
    private _categoryId?: string,
    private _thumbnailUrl?: string,

    private _scheduledAt?: Date,
    private _startedAt?: Date,
    private _endedAt?: Date,

    private _streamUrl?: string,
    private _playbackUrl?: string,
    private _recordingUrl?: string,

    private _isBlocked?: boolean,
    private _blockedReason?: string,

    private _duration?: number,
    private _deletedAt?: Date | null,
  ) {}

  public static create(data: CreateLiveInput): Live {
    const now = new Date();
    const id = UniqueIdService.generate();

    return new Live(
      id,
      data.title,
      data.channelId,
      data.streamKey,

      LIVESTATUS.SCHEDULED,
      VISIBILITY.PUBLIC,

      0,
      0,
      0,
      0,

      true,
      true,

      now,
      now,

      data.description,
      data.categoryId,
      data.thumbnailUrl,

      data.scheduledAt,

      undefined,
      undefined,

      undefined,
      undefined,
      undefined,

      false,
      undefined,

      undefined,
      null,
    );
  }

  // GETTERS
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get status() {
    return this._status;
  }
  get viewerCount() {
    return this._viewerCount;
  }

  public updateDetails(data: { title?: string; description?: string }) {
    if (data.title) this._title = data.title;
    if (data.description) this._description = data.description;

    this.touch();
  }

  public startLive() {
    if (this._status !== LIVESTATUS.SCHEDULED) {
      throw new Error('Cannot start live');
    }

    this._status = LIVESTATUS.LIVE;
    this._startedAt = new Date();
    this.touch();
  }

  public endLive(recordingUrl?: string) {
    if (this._status !== LIVESTATUS.LIVE) {
      throw new Error('Live not active');
    }

    this._status = LIVESTATUS.ENDED;
    this._endedAt = new Date();

    if (recordingUrl) {
      this._recordingUrl = recordingUrl;
    }

    if (this._startedAt && this._endedAt) {
      this._duration =
        (this._endedAt.getTime() - this._startedAt.getTime()) / 1000;
    }

    this.touch();
  }

  public incrementViewer() {
    this._viewerCount++;

    if (this._viewerCount > this._peakViewerCount) {
      this._peakViewerCount = this._viewerCount;
    }
  }

  public decrementViewer() {
    if (this._viewerCount > 0) this._viewerCount--;
  }

  public addLike() {
    this._likeCount++;
  }

  private touch() {
    this._updatedAt = new Date();
  }
}
