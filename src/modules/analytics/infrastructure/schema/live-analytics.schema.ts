import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserGender } from '@/modules/user/domain';

export type LiveAnalyticsDocument = LiveAnalytics & Document;

@Schema({ timestamps: true })
export class LiveAnalytics {
  @Prop({ required: true, index: true })
  liveId!: string;

  @Prop({ required: true, index: true })
  channelId!: string;

  // -------------------- VIEW METRICS --------------------

  @Prop({ default: 0 })
  totalViews!: number;

  @Prop({ default: 0 })
  uniqueViewers!: number;

  @Prop({ default: 0 })
  peakConcurrentViewers!: number;

  // -------------------- WATCH METRICS --------------------

  @Prop({ default: 0 })
  totalWatchTime!: number; // in seconds

  @Prop({ default: 0 })
  avgWatchTime!: number;

  @Prop({ default: 0 })
  duration!: number; // store in seconds for simplicity

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

export const LiveAnalyticsSchema = SchemaFactory.createForClass(LiveAnalytics);
