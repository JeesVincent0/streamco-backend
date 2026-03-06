import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdvertiserDocument {
  @Prop({ required: false })
  companyName: string;
}

export const AdvertiserSchema =
  SchemaFactory.createForClass(AdvertiserDocument);
