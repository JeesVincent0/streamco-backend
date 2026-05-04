import { Live } from '../../domain/entity';
import { IDayLivesInput } from '../inputs';
import { IDayLiveOutput } from '../outputs';
import { LiveResponseMappers } from '../mappers';
import { BadRequestError } from '@/shared/errors';
import { IDayLivesUsecase, ILiveRepo } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class DayLivesUsecase implements IDayLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(input: IDayLivesInput): Promise<IDayLiveOutput[]> {
    const date = new Date(input.date);
    const channelId = input.channelId;

    const result = await this._liveRepo.findByDate(channelId, date);
    if (!result) {
      throw new BadRequestError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    const finalData = result.map((live: Live & { expectedEndAt: Date }) =>
      LiveResponseMappers.toDayLivesResponse(live),
    );

    return finalData;
  }
}
