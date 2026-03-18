import { CategoriesQueryPort } from '../application/ports';
import { CategoryRepoPort } from '../application/ports/category-repository.port';
import {
  CATEGORY_REPO_PORT,
  CREATE_CATEGORY_USE_CASE,
  GET_CATEGORIES_QUERY_PORT,
  GET_CATEGORIES_USE_CASE,
} from '../application/token';
import {
  CreateCategoryUasecase,
  GetCategoriesUsecase,
} from '../application/usecase';
import {
  CategoryRepositoryImplMonogoDB,
  GetAllCategoriesRepository,
} from '../infrastructure/repositories';

export const categoryProviders = [
  {
    provide: CREATE_CATEGORY_USE_CASE,
    useFactory: (categoryRepo: CategoryRepoPort) => {
      return new CreateCategoryUasecase(categoryRepo);
    },
    inject: [CATEGORY_REPO_PORT],
  },

  {
    provide: GET_CATEGORIES_USE_CASE,
    useFactory: (categoryRepo: CategoriesQueryPort) => {
      return new GetCategoriesUsecase(categoryRepo);
    },
    inject: [GET_CATEGORIES_QUERY_PORT],
  },

  {
    provide: CATEGORY_REPO_PORT,
    useClass: CategoryRepositoryImplMonogoDB,
  },

  {
    provide: GET_CATEGORIES_QUERY_PORT,
    useClass: GetAllCategoriesRepository,
  },
];
