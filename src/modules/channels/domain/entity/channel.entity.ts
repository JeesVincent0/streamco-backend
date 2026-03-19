// domain/entities/channel.entity.ts
import { UniqueIdService } from '@/shared/domain';
import { CHANNEL_STATUS } from '../enums';

export interface ChannelProps {
  channelName: string;
  channelId: string;
  userId: string;
  bio?: string;
  profileImageUrl?: string;
  backgroundBannerUrl?: string;
  status?: CHANNEL_STATUS;

  // ─── NEW FIELDS ───
  isLive?: boolean;
  subscribersCount?: number;
  totalViews?: number;
  totalVideos?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Channel {
  private readonly _id?: string;
  private _channelName: string;
  private _channelId: string;
  private _userId: string;
  private _bio: string;
  private _profileImageUrl?: string;
  private _backgroundBannerUrl?: string;
  private _status: CHANNEL_STATUS;

  // ─── NEW FIELDS ───
  private _isLive: boolean;
  private _subscribersCount: number;
  private _totalViews: number;
  private _totalVideos: number;

  private _createdAt: Date;
  private _updatedAt: Date;

  // Private constructor forces the use of the static create() method
  private constructor(props: ChannelProps, id: string) {
    this._id = id;
    this._channelName = props.channelName;
    this._channelId = props.channelId;
    this._userId = props.userId;
    this._bio = props.bio || '';
    this._profileImageUrl = props.profileImageUrl;
    this._backgroundBannerUrl = props.backgroundBannerUrl;
    this._status = props.status || CHANNEL_STATUS.ACTIVE;

    // Initialize new fields (Default to 0 / false for brand new channels)
    this._isLive = props.isLive || false;
    this._subscribersCount = props.subscribersCount || 0;
    this._totalViews = props.totalViews || 0;
    this._totalVideos = props.totalVideos || 0;

    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // ─── Static Factory Method ───────────────────────────────────────────────
  public static create(props: ChannelProps, id?: string): Channel {
    const finalId = id || UniqueIdService.generate();
    return new Channel(props, finalId);
  }

  // ─── Getters ─────────────────────────────────────────────────────────────
  get id(): string | undefined {
    return this._id;
  }
  get channelName(): string {
    return this._channelName;
  }
  get channelId(): string {
    return this._channelId;
  }
  get userId(): string {
    return this._userId;
  }
  get bio(): string {
    return this._bio;
  }
  get profileImageUrl(): string | undefined {
    return this._profileImageUrl;
  }
  get backgroundBannerUrl(): string | undefined {
    return this._backgroundBannerUrl;
  }
  get status(): CHANNEL_STATUS {
    return this._status;
  }

  // New Getters
  get isLive(): boolean {
    return this._isLive;
  }
  get subscribersCount(): number {
    return this._subscribersCount;
  }
  get totalViews(): number {
    return this._totalViews;
  }
  get totalVideos(): number {
    return this._totalVideos;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  // ─── Core Setters (Domain Methods) ───────────────────────────────────────
  public updateChannelDetails(channelName: string, bio: string): void {
    this._channelName = channelName;
    this._bio = bio;
    this.markAsUpdated();
  }

  public updateProfileImage(url: string): void {
    this._profileImageUrl = url;
    this.markAsUpdated();
  }

  public updateBackgroundBanner(url: string): void {
    this._backgroundBannerUrl = url;
    this.markAsUpdated();
  }

  public blockChannel(): void {
    this._status = CHANNEL_STATUS.BLOCKED;
    this.markAsUpdated();
  }

  public activateChannel(): void {
    this._status = CHANNEL_STATUS.ACTIVE;
    this.markAsUpdated();
  }

  // ─── NEW Domain Methods for Metrics & Status ─────────────────────────────

  public startStream(): void {
    this._isLive = true;
    this.markAsUpdated();
  }

  public endStream(): void {
    this._isLive = false;
    this.markAsUpdated();
  }

  public addSubscriber(): void {
    this._subscribersCount += 1;
    this.markAsUpdated();
  }

  public removeSubscriber(): void {
    if (this._subscribersCount > 0) {
      this._subscribersCount -= 1;
      this.markAsUpdated();
    }
  }

  public incrementTotalViews(viewsToAdd: number = 1): void {
    if (viewsToAdd > 0) {
      this._totalViews += viewsToAdd;
      this.markAsUpdated();
    }
  }

  public incrementVideoCount(): void {
    this._totalVideos += 1;
    this.markAsUpdated();
  }

  public decrementVideoCount(): void {
    if (this._totalVideos > 0) {
      this._totalVideos -= 1;
      this.markAsUpdated();
    }
  }

  // Internal helper
  private markAsUpdated(): void {
    this._updatedAt = new Date();
  }
}
