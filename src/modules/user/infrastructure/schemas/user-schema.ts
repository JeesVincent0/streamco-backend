import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  UserContentType,
  UserGender,
  UserSocialMediaType,
} from '@/modules/user/domain/enums';
import { SocialLink } from '../../domain/value-objects';

@Schema()
export class UserDocument {
  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({
    required: true,
    enum: Object.values(UserGender),
  })
  gender: UserGender;

  @Prop()
  bio?: string;

  @Prop()
  location?: string;

  @Prop({
    type: [
      {
        type: { type: String, enum: Object.values(UserSocialMediaType) },
        url: { type: String },
      },
    ],
  })
  socialLinks?: SocialLink[];

  @Prop({
    required: true,
    enum: Object.values(UserContentType),
  })
  contentType: UserContentType;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
