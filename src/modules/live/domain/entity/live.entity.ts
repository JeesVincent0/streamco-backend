import { LIVESTATUS } from '../enums';
import { VISIBILITY } from '../enums';
import { CreateLiveInput, RestoreLive } from '../interfaces';
import { UniqueIdService } from '@/shared/domain';
import { Duration, Time } from '../value-objects';

export class Live {
  private constructor(
    private _id: string,
    private _title: string,
    private _channelId: string,

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

    private _rtcRoomId?: string,
    private _scheduledAt?: Date,
    private _expectedDuration?: Duration,

    private _startedAt?: Date,
    private _endedAt?: Date,

    private _streamUrl?: string,
    private _playbackUrl?: string,
    private _recordingUrl?: string,

    private _isBlocked?: boolean,
    private _blockedReason?: string,

    private _duration?: number,
    private _deletedAt?: Date | null,

    private _isAuctionAvailable?: boolean,
    private _auctionStart?: Date,
    private _auctionEnds?: Date,
  ) {}

  public static createStartDate(date: Date, time: Time): Date {
    const result = new Date(date);

    const [hours, minutes] = time.getValue().split(':').map(Number);
    result.setHours(hours, minutes, 0, 0);

    return result;
  }

  public static create(data: CreateLiveInput): Live {
    const now = new Date();
    const id = UniqueIdService.generate();

    return new Live(
      id,
      data.title,
      data.channelId,

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

      undefined,
      data.scheduledAt,
      data.expectedDuration,

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

  public static restore(data: RestoreLive): Live {
    return new Live(
      data.id,
      data.title,
      data.channelId,

      data.status,
      data.visibility,

      data.viewerCount,
      data.peakViewerCount,
      data.likeCount,
      data.commentCount,

      data.isChatEnabled,
      data.isRecordingEnabled,

      data.createdAt,
      data.updatedAt,

      data.description,
      data.categoryId,
      data.thumbnailUrl,

      data.rtcRoomId,
      data.scheduledAt,
      data.expectedDuration,

      data.startedAt,
      data.endedAt,

      data.streamUrl,
      data.playbackUrl,
      data.recordingUrl,

      data.isBlocked,
      data.blockedReason,

      data.duration,
      data.deletedAt,

      data.isAuctionAvailable,
      data.auctionStart,
      data.auctionEnds,
    );
  }
  // GETTERS
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }

  get channelId() {
    return this._channelId;
  }
  get rtcRoomId() {
    return this._rtcRoomId;
  }

  get status() {
    return this._status;
  }
  get visibility() {
    return this._visibility;
  }

  get viewerCount() {
    return this._viewerCount;
  }
  get peakViewerCount() {
    return this._peakViewerCount;
  }
  get likeCount() {
    return this._likeCount;
  }
  get commentCount() {
    return this._commentCount;
  }

  get isChatEnabled() {
    return this._isChatEnabled;
  }
  get isRecordingEnabled() {
    return this._isRecordingEnabled;
  }

  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  get categoryId() {
    return this._categoryId;
  }
  get thumbnailUrl() {
    return this._thumbnailUrl;
  }

  get scheduledAt() {
    return this._scheduledAt;
  }
  get expectedDuration() {
    return this._expectedDuration;
  }
  get startedAt() {
    return this._startedAt;
  }
  get endedAt() {
    return this._endedAt;
  }

  get streamUrl() {
    return this._streamUrl;
  }
  get playbackUrl() {
    return this._playbackUrl;
  }
  get recordingUrl() {
    return this._recordingUrl;
  }

  get isBlocked() {
    return this._isBlocked;
  }
  get blockedReason() {
    return this._blockedReason;
  }

  get duration() {
    return this._duration;
  }
  get deletedAt() {
    return this._deletedAt;
  }

  get isAuctionAvailable() {
    return this._isAuctionAvailable;
  }
  get auctionStart() {
    return this._auctionStart;
  }
  get auctionEnds() {
    return this._auctionEnds;
  }

  public setAuction() {
    const minAuctionGap = 3 * 60 * 60000;

    if (!this._scheduledAt) return;

    if (
      this._scheduledAt.getTime() - this._createdAt.getTime() >=
      minAuctionGap
    ) {
      this._isAuctionAvailable = true;

      this._auctionStart = new Date(this._createdAt.getTime() + 60 * 60000);

      this._auctionEnds = new Date(this._scheduledAt.getTime() - 60 * 60000);
    }
  }

  public cancelLive() {
    if (this._status === LIVESTATUS.SCHEDULED) {
      this._status = LIVESTATUS.CANCELLED;
      this.touch();
    }
  }

  public setTitle(title: string) {
    this._title = title;
    this.touch();
  }

  public setDescription(description?: string) {
    this._description = description;
    this.touch();
  }

  public setVisibility(visibility: VISIBILITY) {
    this._visibility = visibility;
    this.touch();
  }

  public setCategory(categoryId?: string) {
    this._categoryId = categoryId;
    this.touch();
  }

  public setThumbnail(thumbnailUrl?: string) {
    this._thumbnailUrl = thumbnailUrl;
    this.touch();
  }

  public setScheduledAt(date?: Date) {
    this._scheduledAt = date;
    this.touch();
  }

  public setStreamingUrls(data: { streamUrl?: string; playbackUrl?: string }) {
    if (data.streamUrl) this._streamUrl = data.streamUrl;
    if (data.playbackUrl) this._playbackUrl = data.playbackUrl;
    this.touch();
  }

  public enableChat() {
    this._isChatEnabled = true;
    this.touch();
  }

  public disableChat() {
    this._isChatEnabled = false;
    this.touch();
  }

  public enableRecording() {
    this._isRecordingEnabled = true;
    this.touch();
  }

  public disableRecording() {
    this._isRecordingEnabled = false;
    this.touch();
  }

  public block(reason: string) {
    this._isBlocked = true;
    this._blockedReason = reason;
    this.touch();
  }

  public unblock() {
    this._isBlocked = false;
    this._blockedReason = undefined;
    this.touch();
  }

  public softDelete() {
    this._deletedAt = new Date();
    this.touch();
  }

  private touch() {
    this._updatedAt = new Date();
  }
}
