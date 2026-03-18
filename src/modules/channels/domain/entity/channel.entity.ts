// domain/entities/channel.entity.ts
import { CHANNEL_STATUS } from '../enums';

export interface ChannelProps {
  channelName: string;
  channelId: string; // The unique @handle
  userId: string; // The ID of the user who owns this channel
  bio?: string;
  profileImageUrl: string;
  backgroundBannerUrl?: string;
  status?: CHANNEL_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Channel {
  private readonly _id?: string;
  private _channelName: string;
  private _channelId: string;
  private _userId: string;
  private _bio: string;
  private _profileImageUrl: string;
  private _backgroundBannerUrl: string;
  private _status: CHANNEL_STATUS;
  private _createdAt: Date;
  private _updatedAt: Date;

  // Private constructor forces the use of the static create() method
  private constructor(props: ChannelProps, id?: string) {
    this._id = id;
    this._channelName = props.channelName;
    this._channelId = props.channelId;
    this._userId = props.userId;
    this._bio = props.bio || '';
    this._profileImageUrl = props.profileImageUrl;
    this._backgroundBannerUrl = props.backgroundBannerUrl || '';
    this._status = props.status || CHANNEL_STATUS.ACTIVE;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // ─── Static Factory Method ───────────────────────────────────────────────
  public static create(props: ChannelProps, id?: string): Channel {
    // You can add domain validation here before instantiation if needed
    // e.g., if (!props.channelName) throw new Error("Channel name required");

    return new Channel(props, id);
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

  get profileImageUrl(): string {
    return this._profileImageUrl;
  }

  get backgroundBannerUrl(): string {
    return this._backgroundBannerUrl;
  }

  get status(): CHANNEL_STATUS {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // ─── Setters (Domain Methods) ────────────────────────────────────────────
  // In DDD, it is often better to use descriptive method names rather than
  // generic setters to express the *intent* of the change.

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

  // Internal helper to update the timestamp whenever a setter is called
  private markAsUpdated(): void {
    this._updatedAt = new Date();
  }
}
