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
    const scheduledAt = entity.scheduledAt;

    const date = scheduledAt
      ? scheduledAt.toISOString().split('T')[0]
      : undefined;

    const time = scheduledAt
      ? scheduledAt.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      : undefined;

    return {
      id: entity.id,
      title: entity.title,
      date,
      time,
      status: entity.status,
    };
  }

  static toScheduleLivesResponseForArray(
    entityArray: Live[],
  ): IGetScheduledLives[] {
    return entityArray.map((entity: Live) =>
      this.toScheduleLivesResponse(entity),
    );
  }
}
