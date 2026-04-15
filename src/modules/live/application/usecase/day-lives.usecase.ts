import { BadRequestError } from '@/shared/errors';
import { Live } from '../../domain/entity';
import { IDayLivesInput } from '../inputs';
import { IDayLivesUsecase, ILiveRepo } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class DayLivesUsecase implements IDayLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(
    input: IDayLivesInput,
  ): Promise<(Live & { expectedEndAt: Date })[]> {
    const date = new Date(input.date);
    const channelId = input.channelId;

    const result = await this._liveRepo.findByDate(channelId, date);
    if (!result) {
      throw new BadRequestError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    return result;
  }
}
