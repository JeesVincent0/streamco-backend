import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdvertiserDocument {
  @Prop({ required: true })
  companyName: string;
}

export const AdvertiserSchema =
  SchemaFactory.createForClass(AdvertiserDocument);
