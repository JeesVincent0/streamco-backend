import { CategoryRepoPort } from '../application/ports/category-repository.port';
import {
  CATEGORY_REPO_PORT,
  CREATE_CATEGORY_USE_CASE,
} from '../application/token';
import { CreateCategoryUasecase } from '../application/usecase';
import { CategoryRepositoryImplMonogoDB } from '../infrastructure/repositories';

export const categoryProviders = [
  {
    provide: CREATE_CATEGORY_USE_CASE,
    useFactory: (categoryRepo: CategoryRepoPort) => {
      return new CreateCategoryUasecase(categoryRepo);
    },
    inject: [CATEGORY_REPO_PORT],
  },

  {
    provide: CATEGORY_REPO_PORT,
    useClass: CategoryRepositoryImplMonogoDB,
  },
];
