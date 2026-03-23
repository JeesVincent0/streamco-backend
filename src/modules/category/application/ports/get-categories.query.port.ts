import { GetCategoriesInput } from '../inputs';
import { CategoriesOuput } from '../output';

export interface ICategoriesQuery {
  execute(query: GetCategoriesInput): Promise<CategoriesOuput>;
}
