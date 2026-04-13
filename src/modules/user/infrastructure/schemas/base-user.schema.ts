import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  UserContentType,
  UserGender,
  UserRole,
  UserStatus,
} from '../../domain/enums';
import { SocialLink } from '../../domain/value-objects';

@Schema({ discriminatorKey: 'role', timestamps: true })
export class BaseUserDocument extends Document {
  @Prop({ required: true, unique: true, index: true })
  id!: string;

  @Prop({ required: false })
  firstName!: string;

  @Prop({ required: false })
  lastName!: string;

  @Prop({ required: true })
  displayName!: string;

  @Prop({ required: false })
  googleId!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: false })
  password!: string;

  @Prop({ required: true, enum: Object.values(UserRole), type: String })
  role!: UserRole;

  @Prop({ required: true, enum: Object.values(UserStatus) })
  status!: string;

  @Prop({ required: true, type: Boolean, default: false })
  isProfileCompleted!: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  isVerified!: boolean;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: true })
  createdAt!: Date;
}

export const BaseUserSchema = SchemaFactory.createForClass(BaseUserDocument);

export type UserDiscriminatorUserDocument =
  HydratedDocument<BaseUserDocument> & {
    dateOfBirth: Date;
    gender: UserGender;
    contentType: UserContentType;
    bio?: string;
    location?: string;
    socialLinks?: SocialLink[];
  };

export type AdvertiserDiscriminatorUserDocument =
  HydratedDocument<BaseUserDocument> & {
    companyName: string;
  };
