// repo interfaces
import { ICategoriesQuery, ICategoryRepo } from '../application/ports';

// tokens
import {
  CATEGORY_REPO_TOKEN,
  GET_CATEGORIES_QUERY_TOKEN,
  GET_CATEGORIES_USE_CASE_TOKEN,
  CREATE_CATEGORY_USE_CASE_TOKEN,
  UPDATE_CATEGORY_STATUS_USE_CASE_TOKEN,
} from '../application/token';

// usecases
import {
  GetCategoriesUsecase,
  CreateCategoryUasecase,
  UpdateCategoryStatusUsecase,
} from '../application/usecase';

// repository concrete methods
import {
  GetAllCategoriesRepository,
  CategoryRepositoryImplMonogoDB,
} from '../infrastructure/repositories';

export const categoryProviders = [
  {
    provide: CREATE_CATEGORY_USE_CASE_TOKEN,
    useFactory: (categoryRepo: ICategoryRepo) => {
      return new CreateCategoryUasecase(categoryRepo);
    },
    inject: [CATEGORY_REPO_TOKEN],
  },

  {
    provide: GET_CATEGORIES_USE_CASE_TOKEN,
    useFactory: (categoryRepo: ICategoriesQuery) => {
      return new GetCategoriesUsecase(categoryRepo);
    },
    inject: [GET_CATEGORIES_QUERY_TOKEN],
  },

  {
    provide: UPDATE_CATEGORY_STATUS_USE_CASE_TOKEN,
    useFactory: (categoryRepo: ICategoryRepo) => {
      return new UpdateCategoryStatusUsecase(categoryRepo);
    },
    inject: [CATEGORY_REPO_TOKEN],
  },

  {
    provide: CATEGORY_REPO_TOKEN,
    useClass: CategoryRepositoryImplMonogoDB,
  },

  {
    provide: GET_CATEGORIES_QUERY_TOKEN,
    useClass: GetAllCategoriesRepository,
  },
];
