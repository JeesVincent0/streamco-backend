import { GetCategoriesInput } from '../inputs';
import { CategoriesOuput } from '../output';

export interface CategoriesQueryPort {
  execute(query: GetCategoriesInput): Promise<CategoriesOuput>;
}
