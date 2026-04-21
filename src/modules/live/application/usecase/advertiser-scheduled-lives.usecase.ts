import { IAdvertiserScheduledLivesInput } from '../inputs';
import { LiveResponseMappers } from '../mappers';
import { IAdvertiserScheduledLiveOutput } from '../outputs';
import { IAdvertiserScheduledLivesUsecase, ILiveRepo } from '../ports';

export class AdvertiserScheduledLivesUsecase implements IAdvertiserScheduledLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(
    input: IAdvertiserScheduledLivesInput,
  ): Promise<IAdvertiserScheduledLiveOutput> {
    const result = await this._liveRepo.scheduledLivesForAdvertiser(input);

    const scheduledLives =
      LiveResponseMappers.toScheduledLivesForAdvertiserArray(
        result.scheduledLives,
      );

    return {
      scheduledLives,
      pagination: result.pagination,
    };
  }
}
