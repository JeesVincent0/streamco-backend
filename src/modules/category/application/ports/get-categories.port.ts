import { GetCategoriesInput } from '../inputs';
import { GetCategoriesOuput } from '../output';

export interface GetCategoriesInterface {
  execute(input: GetCategoriesInput): Promise<GetCategoriesOuput>;
}
