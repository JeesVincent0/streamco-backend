// infrastructure/database/schemas/channel.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CHANNEL_STATUS } from '../../domain/enums';

export type ChannelDocument = ChannelModel & Document;

@Schema({ timestamps: true, collection: 'channels' })
export class ChannelModel {
  @Prop({ type: String, required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, trim: true })
  channelName: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  channelId: string;

  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: null })
  profileImageUrl?: string;

  @Prop({ default: null })
  backgroundBannerUrl?: string;

  @Prop({ type: String, enum: CHANNEL_STATUS, default: CHANNEL_STATUS.ACTIVE })
  status: CHANNEL_STATUS;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(ChannelModel);
