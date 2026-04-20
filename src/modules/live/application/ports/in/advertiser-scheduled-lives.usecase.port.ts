import { IAdvertiserScheduledLivesInput } from '../../inputs';
import { IAdvertiserScheduledLiveOutput } from '../../outputs';

export interface IAdvertiserScheduledLivesUsecase {
  execute(
    input: IAdvertiserScheduledLivesInput,
  ): Promise<IAdvertiserScheduledLiveOutput>;
}
