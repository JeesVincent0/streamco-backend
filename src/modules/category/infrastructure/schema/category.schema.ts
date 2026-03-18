import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

@Schema({ timestamps: true })
export class CategoryDocument extends Document {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    required: true,
    enum: Object.values(CATEGORY_STATUS),
    default: CATEGORY_STATUS.ACTIVE,
  })
  status: CATEGORY_STATUS;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  liveCount: number;

  @Prop({ required: true })
  scheduledLiveCount: number;

  @Prop({ required: false })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);
