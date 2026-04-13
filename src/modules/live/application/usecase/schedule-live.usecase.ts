import { ILogger } from '@/shared/logger';
import { Live } from '../../domain/entity';
import { ScheduleLiveInput } from '../inputs';
import { BadRequestError } from '@/shared/errors';
import { Duration, Time } from '../../domain/value-objects';
import { ICategoryChecker, ILiveRepo, IScheduleLiveUseCase } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class ScheduleLiveUseCase implements IScheduleLiveUseCase {
  constructor(
    private readonly _liveRepo: ILiveRepo,
    private readonly _categoryChecker: ICategoryChecker,
    private readonly _thumnailStroage: IStorageService,
    private readonly _logger: ILogger,
  ) {}

  async execute(input: ScheduleLiveInput): Promise<void> {
    const time = Time.create(input.time);
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

    const scheduledAt = Live.createStartDate(input.date, time);

    const scheduleLive = Live.create({
      scheduledAt,
      title: input.title,
      channelId: input.channelId,
      expectedDuration: duration,
      thumbnailUrl: thumbnailPath,
      categoryId: input.categoryId,
      description: input.description,
    });

    this._logger.log({
      event: LOG_EVENTS.ENTITY_CREATED,
      context: 'ScheduleLiveUseCase',
      channelId: input.channelId,
    });

    const { id } = await this._liveRepo.save(scheduleLive);

    this._logger.log({
      event: LOG_EVENTS.LIVE_SCHEDULED,
      context: 'ScheduleLiveUseCase',
      scheduleLiveId: id,
    });

    throw new BadRequestError(`TEST ERROR LIVE USECASE`);
  }
}
