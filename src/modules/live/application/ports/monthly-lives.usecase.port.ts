import { IMonthlyLivesInput } from '../inputs';
import { IMonthlyLivesOutput } from '../outputs';

export interface IMonthlyLivesUsecase {
  execute(input: IMonthlyLivesInput): Promise<IMonthlyLivesOutput[]>;
}
