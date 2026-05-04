import { LiveResponseMappers } from '../mappers';
import { IGetScheduledLivesInput } from '../inputs';
import { IGetScheduledLivesOutput } from '../outputs';
import { IGetScheduledLivesUsecase, ILiveRepo } from '../ports';

export class GetScheduledLivesUsecase implements IGetScheduledLivesUsecase {
  constructor(private readonly _liveRepo: ILiveRepo) {}
  async execute(
    input: IGetScheduledLivesInput,
  ): Promise<IGetScheduledLivesOutput> {
    const result = await this._liveRepo.findByQueryScheduledLives(input);

    const finalResultOfLives =
      LiveResponseMappers.toScheduleLivesResponseForArray(result.lives);

    return {
      scheduledLives: finalResultOfLives,
      pagination: result.pagination,
    };
  }
}
