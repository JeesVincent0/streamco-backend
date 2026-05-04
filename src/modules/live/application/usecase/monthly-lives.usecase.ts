import { BadRequestError } from '@/shared/errors';
import { IMonthlyLivesInput } from '../inputs';
import { IMonthlyLivesOutput } from '../outputs';
import { ILiveRepo, IMonthlyLivesUsecase } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class MonthlyLivesUsecase implements IMonthlyLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(input: IMonthlyLivesInput): Promise<IMonthlyLivesOutput[]> {
    const year = Number(input.year);
    const month = Number(input.month);
    const channelId = input.channelId;

    const result = await this._liveRepo.findMonthlySummary(
      channelId,
      year,
      month,
    );

    if (!result) {
      throw new BadRequestError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    return result;
  }
}
