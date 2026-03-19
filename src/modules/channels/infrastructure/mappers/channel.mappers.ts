// infrastructure/mappers/channel.mapper.ts
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

        // ─── MAP NEW FIELDS ───
        isLive: raw.isLive,
        subscribersCount: raw.subscribersCount,
        totalViews: raw.totalViews,
        totalVideos: raw.totalVideos,

        createdAt: raw.createdAt as Date,
        updatedAt: raw.updatedAt as Date,
      },
      raw.id,
    );
  }

  // Domain -> DB
  public static toPersistence(entity: Channel): Record<string, unknown> {
    return {
      id: entity.id,
      channelName: entity.channelName,
      channelId: entity.channelId,
      userId: entity.userId,
      bio: entity.bio,
      profileImageUrl: entity.profileImageUrl || null,
      backgroundBannerUrl: entity.backgroundBannerUrl || null,
      status: entity.status,

      // ─── MAP NEW FIELDS ───
      isLive: entity.isLive,
      subscribersCount: entity.subscribersCount,
      totalViews: entity.totalViews,
      totalVideos: entity.totalVideos,

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
