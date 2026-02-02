import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, UserStatus } from '../../domain/enums';

@Schema({ discriminatorKey: 'role', timestamps: true })
export class BaseUserDocument extends Document {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Object.values(UserRole) })
  role: UserRole;

  @Prop({ required: true, enum: Object.values(UserStatus) })
  status: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;
}

export const BaseUserSchema = SchemaFactory.createForClass(BaseUserDocument);
