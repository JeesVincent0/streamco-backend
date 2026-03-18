import { Channel } from '../../domain/entity';
import { ChannelDocument } from '../schema';

export class ChannelMapper {
  // DB -> Domain
  public static toDomain(raw: ChannelDocument): Channel {
    return Channel.create(
      {
        channelName: raw.channelName,
        channelId: raw.channelId,
        userId: raw.userId,
        bio: raw.bio,
        profileImageUrl: raw.profileImageUrl || undefined,
        backgroundBannerUrl: raw.backgroundBannerUrl || undefined,
        status: raw.status,
        createdAt: raw.createdAt as Date,
        updatedAt: raw.updatedAt as Date,
      },
      raw.id,
    );
  }

  // Domain -> DB
  public static toPersistence(entity: Channel) {
    return {
      id: entity.id,
      channelName: entity.channelName,
      channelId: entity.channelId,
      userId: entity.userId,
      bio: entity.bio,
      profileImageUrl: entity.profileImageUrl || null,
      backgroundBannerUrl: entity.backgroundBannerUrl || null,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
