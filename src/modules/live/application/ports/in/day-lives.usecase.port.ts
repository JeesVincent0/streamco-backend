import { IDayLivesInput } from '../../inputs';
import { IDayLiveOutput } from '../../outputs';

export interface IDayLivesUsecase {
  execute(input: IDayLivesInput): Promise<IDayLiveOutput[]>;
}
