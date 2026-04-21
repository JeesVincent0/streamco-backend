import { LiveDocument } from '../schema';
import { Live } from '../../domain/entity';
import { Duration } from '../../domain/value-objects';

export class LiveMappers {
  static toPersistence(entity: Live) {
    return {
      id: entity.id,
      title: entity.title,
      channelId: entity.channelId,

      status: entity.status,
      visibility: entity.visibility,

      viewerCount: entity.viewerCount,
      peakViewerCount: entity.peakViewerCount,
      likeCount: entity.likeCount,
      commentCount: entity.commentCount,

      isChatEnabled: entity.isChatEnabled,
      isRecordingEnabled: entity.isRecordingEnabled,

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

      description: entity.description,
      categoryId: entity.categoryId,
      thumbnailUrl: entity.thumbnailUrl,

      rtcRoomId: entity.rtcRoomId,
      scheduledAt: entity.scheduledAt,

      expectedDuration: entity.expectedDuration
        ? entity.expectedDuration.getValue()
        : undefined,
      expectedEndAt:
        entity.scheduledAt && entity.expectedDuration
          ? new Date(
              entity.scheduledAt.getTime() +
                entity.expectedDuration.toMinutes() * 60000,
            )
          : undefined,

      startedAt: entity.startedAt,
      endedAt: entity.endedAt,

      streamUrl: entity.streamUrl,
      playbackUrl: entity.playbackUrl,
      recordingUrl: entity.recordingUrl,

      isBlocked: entity.isBlocked,
      blockedReason: entity.blockedReason,

      duration: entity.duration,
      deletedAt: entity.deletedAt,
    };
  }

  static toDomain(doc: LiveDocument): Live {
    return Live.restore({
      id: doc.id,
      title: doc.title,
      channelId: doc.channelId,

      status: doc.status,
      visibility: doc.visibility,

      viewerCount: doc.viewerCount,
      peakViewerCount: doc.peakViewerCount,
      likeCount: doc.likeCount,
      commentCount: doc.commentCount,

      isChatEnabled: doc.isChatEnabled,
      isRecordingEnabled: doc.isRecordingEnabled,

      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,

      description: doc.description,
      categoryId: doc.categoryId,
      thumbnailUrl: doc.thumbnailUrl,

      rtcRoomId: doc.rtcRoomId,
      scheduledAt: doc.scheduledAt,
      expectedDuration: doc.expectedDuration
        ? Duration.create(doc.expectedDuration)
        : undefined,

      startedAt: doc.startedAt,
      endedAt: doc.endedAt,

      streamUrl: doc.streamUrl,
      playbackUrl: doc.playbackUrl,
      recordingUrl: doc.recordingUrl,

      isBlocked: doc.isBlocked,
      blockedReason: doc.blockedReason,

      duration: doc.duration,
      deletedAt: doc.deletedAt,
    });
  }

  static toDomainAdvertiserScheduledLives(
    doc: LiveDocument & { channelName: string; categoryName: string },
  ): Live & { channelName: string; categoryName: string } {
    const domain = this.toDomain(doc);

    return Object.assign(domain, {
      channelName: doc.channelName,
      categoryName: doc.categoryName,
    });
  }
}
