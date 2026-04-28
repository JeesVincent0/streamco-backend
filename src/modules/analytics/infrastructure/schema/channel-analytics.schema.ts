import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserGender } from '@/modules/user/domain';

export type ChannelAnalyticsDocument = ChannelAnalytics & Document;

@Schema({ timestamps: true })
export class ChannelAnalytics {
  @Prop({ required: true, unique: true, index: true })
  channelId!: string;

  // -------------------- SUMMARY --------------------

  @Prop({ default: 0 })
  totalLives!: number;

  @Prop({ default: 0 })
  totalViews!: number;

  @Prop({ default: 0 })
  uniqueViewers!: number;

  @Prop({ default: 0 })
  totalWatchTime!: number;

  @Prop({ default: 0 })
  avgWatchTime!: number;

  @Prop({ default: 0 })
  avgConcurrentViewers!: number;

  @Prop({ default: 0 })
  totalBidAmount!: number;

  @Prop({ default: 0 })
  avgBidAmount!: number;

  @Prop({
    type: {
      sponsorId: String,
      sponsorName: String,
    },
    default: null,
  })
  lastSponsor!: {
    sponsorId: string;
    sponsorName: string;
  };

  // -------------------- AUDIENCE --------------------

  @Prop({
    type: Object,
    default: {},
  })
  viewerGenderCount!: Record<UserGender, number>;

  @Prop({
    type: Object,
    default: {},
  })
  viewerAgeWiseCount!: Record<string, number>;
}

export const ChannelAnalyticsSchema =
  SchemaFactory.createForClass(ChannelAnalytics);
