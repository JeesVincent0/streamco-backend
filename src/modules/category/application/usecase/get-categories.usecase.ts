import { GetCategoriesInput } from '../inputs';
import { GetCategoriesOuput } from '../output';
import { CategoriesQueryPort, GetCategoriesInterface } from '../ports';

export class GetCategoriesUsecase implements GetCategoriesInterface {
  constructor(private readonly _categoryRepo: CategoriesQueryPort) {}

  async execute(input: GetCategoriesInput): Promise<GetCategoriesOuput> {
    try {
      const repositoryResult = await this._categoryRepo.execute(input);

      // Map Domain Entities to plain JSON objects (CategoriesType)
      const mappedCategories = repositoryResult.data.categories.map(
        (category) => ({
          id: category.id,
          name: category.name,
          status: category.status,
          scheduledLiveCount: category.scheduledLiveCount,
          liveCount: category.liveCount,
        }),
      );

      return {
        status: 'success',
        message: 'Categories retrieved successfully',
        data: {
          categories: mappedCategories,
          pagination: repositoryResult.data.pagination,
        },
      };
    } catch (error: any) {
      throw new Error(
        error.message || 'An error occurred while fetching categories',
      );
    }
  }
}
