import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RefreshTokenDocument {
  @Prop({ required: true, ref: 'User', index: true })
  userId: string;

  @Prop({ required: true })
  jti: string;

  @Prop({ required: true })
  revoked: boolean;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true, index: { expireAfterSeconds: 0 } })
  expiresAt: Date;
}

export const RefreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenDocument);
