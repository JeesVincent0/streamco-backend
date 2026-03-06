import { UserSocialMediaType } from '@/modules/user/domain/enums';
import { BadRequestError } from '@/shared/errors';

export class SocialLink {
  private constructor(
    private readonly _type: UserSocialMediaType,
    private readonly _url: string,
  ) {}

  static create(type: UserSocialMediaType, url: string): SocialLink {
    if (!url.startsWith('https')) {
      throw new BadRequestError(`Invalid url for ${type}`);
    }
    const normalizedUrl = url.trim().toLowerCase();

    return new SocialLink(type, normalizedUrl);
  }

  static restore(type: UserSocialMediaType, url: string): SocialLink {
    return new SocialLink(type, url);
  }

  getType(): UserSocialMediaType {
    return this._type;
  }

  getUrl(): string {
    return this._url;
  }
}
