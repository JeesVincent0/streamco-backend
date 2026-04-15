import { Live } from '../../domain/entity';

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
}
