import { Live } from '../../domain/entity';
import { IGetScheduledLives } from '../outputs';

export class LiveResponseMappers {
  static toDayLivesResponse(entity: Live & { expectedEndAt: Date }) {
    return {
      id: entity.id,
      title: entity.title,
      status: entity.status,
      scheduleAt: entity.scheduledAt,
      thumbnailUrl: entity.thumbnailUrl,
      expectedEndAt: entity.expectedEndAt,
    };
  }

  static toScheduleLivesResponse(entity: Live): IGetScheduledLives {
    return {
      id: entity.id,
      title: entity.title,
      status: entity.status,
      scheduledAt: entity.scheduledAt,
    };
  }

  static toScheduleLivesResponseForArray(
    entityArray: Live[],
  ): IGetScheduledLives[] {
    return entityArray.map((entity: Live) =>
      this.toScheduleLivesResponse(entity),
    );
  }

  static toScheduledLivesForAdvertiser(
    entity: Live & { channelName: string; categoryName: string },
  ) {
    let isAuctionRunning: boolean | undefined;
    if (
      entity.isAuctionAvailable &&
      entity.auctionStart &&
      entity.auctionEnds
    ) {
      isAuctionRunning =
        entity.auctionStart <= new Date() && new Date() <= entity.auctionEnds;
    }
    return {
      id: entity.id,
      title: entity.title,
      category: entity.categoryName,
      scheduledAt: entity.scheduledAt,
      channelName: entity.channelName,
      isAuctionRunning,
    };
  }

  static toScheduledLivesForAdvertiserArray(
    entityArray: (Live & { channelName: string; categoryName: string })[],
  ) {
    const result = entityArray.map((entity) =>
      this.toScheduledLivesForAdvertiser(entity),
    );
    return result;
  }
}
