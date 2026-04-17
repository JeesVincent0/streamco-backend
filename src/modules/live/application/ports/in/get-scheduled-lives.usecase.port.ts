import { IGetScheduledLivesInput } from '../../inputs';
import { IGetScheduledLivesOutput } from '../../outputs';

export interface IGetScheduledLivesUsecase {
  execute(input: IGetScheduledLivesInput): Promise<IGetScheduledLivesOutput>;
}
