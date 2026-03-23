import { GetCategoriesInput } from '../inputs';
import { GetCategoriesOuput } from '../output';

export interface IGetCategoriesUsecase {
  execute(input: GetCategoriesInput): Promise<GetCategoriesOuput>;
}
