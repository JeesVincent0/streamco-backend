import { LIVESTATUS } from '../../domain/enums';
import { BadRequestError } from '@/shared/errors';
import { ICancelScheduledLiveInput } from '../inputs';
import { ICancelScheduledLiveUsecase, ILiveRepo } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class CancelScheduledLiveUsecase implements ICancelScheduledLiveUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(input: ICancelScheduledLiveInput): Promise<void> {
    const scheduledLiveId = input.scheduledLiveId;

    const scheduledLive = await this._liveRepo.findById(scheduledLiveId);

    if (!scheduledLive) {
      throw new BadRequestError(ERROR_MESSAGES.SCHEDULED_LIVE_NOT_FOUND);
    }

    if (scheduledLive.status === LIVESTATUS.CANCELLED) {
      return;
    }

    scheduledLive.cancelLive();

    await this._liveRepo.save(scheduledLive);
  }
}
