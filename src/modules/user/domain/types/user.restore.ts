import { UserContentType, UserGender, UserSocialMediaType } from '../enums';
import { BaseUserRestoreProps } from './base-user.restore';

export interface UserRestoreProps extends BaseUserRestoreProps {
  gender: UserGender;
  dateOfBirth: Date;
  bio?: string;
  location?: string;
  socialLinks: {
    type: UserSocialMediaType;
    url: string;
  }[];
  contentType: UserContentType;
}
