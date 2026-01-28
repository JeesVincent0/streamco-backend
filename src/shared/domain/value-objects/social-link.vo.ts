import { UserSocialMediaType } from '@/shared/domain/enums';

export class SocialLink {
  private constructor(
    private readonly _type: UserSocialMediaType,
    private readonly _url: string,
  ) {}

  static create(type: UserSocialMediaType, url: string): SocialLink {
    if (!url.startsWith('https')) {
      throw new Error(`Invalid url for ${type}`);
    }
    const normalizedUrl = url.trim().toLowerCase();

    return new SocialLink(type, normalizedUrl);
  }

  getType(): UserSocialMediaType {
    return this._type;
  }

  getUrl(): string {
    return this._url;
  }
}
