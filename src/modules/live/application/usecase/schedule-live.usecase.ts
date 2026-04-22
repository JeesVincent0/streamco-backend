import {
  ILiveRepo,
  ILiveQueue,
  ICategoryChecker,
  IScheduleLiveUseCase,
} from '../ports';

import { ILogger } from '@/shared/logger';
import { Live } from '../../domain/entity';
import { ScheduleLiveInput } from '../inputs';
import { BadRequestError } from '@/shared/errors';
import { Duration } from '../../domain/value-objects';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class ScheduleLiveUseCase implements IScheduleLiveUseCase {
  constructor(
    private readonly _liveQueue: ILiveQueue,
    private readonly _liveRepo: ILiveRepo,
    private readonly _categoryChecker: ICategoryChecker,
    private readonly _thumnailStroage: IStorageService,
    private readonly _logger: ILogger,
  ) {}

  async execute(input: ScheduleLiveInput): Promise<void> {
    const duration = Duration.create(input.duration);

    const isCategoryActive = await this._categoryChecker.isCategoryActive(
      input.categoryId,
    );

    if (!isCategoryActive) {
      this._logger.error({
        event: LOG_EVENTS.CATEGORY_BLOCKED,
        constext: 'ScheduleLiveUseCase',
        channeId: input.channelId,
      });

      throw new BadRequestError(ERROR_MESSAGES.SELECTED_CATEGORY_BLOCKED);
    }

    const scheduledAt = new Date(input.scheduledAt);

    if (scheduledAt <= new Date()) {
      this._logger.error({
        event: LOG_EVENTS.SCHEDULED_TIME_MUST_BE_IN_THE_FUTURE,
        constext: 'ScheduleLiveUseCase',
        channeId: input.channelId,
      });
      throw new BadRequestError(
        ERROR_MESSAGES.SCHEDULED_TIME_MUST_BE_IN_THE_FUTURE,
      );
    }

    const durationMinutes = duration.toMinutes();
    const newStart = scheduledAt;
    const newEnd = new Date(newStart.getTime() + durationMinutes * 60000);

    const conflict = await this._liveRepo.findConflict(
      input.channelId,
      newStart,
      newEnd,
    );

    if (conflict) {
      this._logger.error({
        event: ERROR_MESSAGES.TIME_SLOT_ALREADY_BOOKED,
        constext: 'ScheduleLiveUseCase',
        channeId: input.channelId,
      });
      throw new BadRequestError(ERROR_MESSAGES.TIME_SLOT_ALREADY_BOOKED);
    }

    const thumbnailPath = await this._thumnailStroage.uploadBase64(
      input.thumbnail,
      'thumbnail',
      `${input.channelId}-profile.jpg`,
    );
    this._logger.log({
      event: LOG_EVENTS.THUMBNAIL_UPLOADED,
      context: 'ScheduleLiveUseCase',
      channelId: input.channelId,
    });

    const scheduleLive = Live.create({
      scheduledAt,
      title: input.title,
      channelId: input.channelId,
      expectedDuration: duration,
      thumbnailUrl: thumbnailPath,
      categoryId: input.categoryId,
      description: input.description,
    });

    scheduleLive.setAuction();

    this._logger.log({
      event: LOG_EVENTS.ENTITY_CREATED,
      context: 'ScheduleLiveUseCase',
      channelId: input.channelId,
    });

    const { id } = await this._liveRepo.save(scheduleLive);

    await this._liveQueue.scheduledLiveAutoCancel(id, scheduledAt);

    this._logger.log({
      event: LOG_EVENTS.LIVE_SCHEDULED,
      context: 'ScheduleLiveUseCase',
      scheduleLiveId: id,
    });
  }
}
