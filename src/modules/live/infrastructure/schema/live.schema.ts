import { Document } from 'mongoose';
import { LIVESTATUS, VISIBILITY } from '../../domain/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LiveDocument = LiveModel & Document;

@Schema({ timestamps: false })
export class LiveModel {
  @Prop({ type: String, required: true, unique: true, index: true })
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true, index: true })
  channelId!: string;

  @Prop({ type: String, enum: LIVESTATUS, required: true })
  status!: LIVESTATUS;

  @Prop({ type: String, enum: VISIBILITY, required: true })
  visibility!: VISIBILITY;

  @Prop({ type: Number, default: 0 })
  viewerCount!: number;

  @Prop({ type: Number, default: 0 })
  peakViewerCount!: number;

  @Prop({ type: Number, default: 0 })
  likeCount!: number;

  @Prop({ type: Number, default: 0 })
  commentCount!: number;

  @Prop({ type: Boolean, default: true })
  isChatEnabled!: boolean;

  @Prop({ type: Boolean, default: true })
  isRecordingEnabled!: boolean;

  @Prop({ type: Date, required: true })
  createdAt!: Date;

  @Prop({ type: Date, required: true })
  updatedAt!: Date;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, index: true })
  categoryId?: string;

  @Prop({ type: String })
  thumbnailUrl?: string;

  @Prop({ type: String })
  rtcRoomId?: string;

  @Prop({ type: Date })
  scheduledAt?: Date;

  @Prop({ type: String })
  expectedDuration?: string;

  @Prop({ type: Date })
  startedAt?: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: String })
  streamUrl?: string;

  @Prop({ type: String })
  playbackUrl?: string;

  @Prop({ type: String })
  recordingUrl?: string;

  @Prop({ type: Boolean, default: false })
  isBlocked?: boolean;

  @Prop({ type: String })
  blockedReason?: string;

  @Prop({ type: Number })
  duration?: number;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export const LiveSchema = SchemaFactory.createForClass(LiveModel);
