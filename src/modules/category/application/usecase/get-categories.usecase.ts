import { GetCategoriesInput } from '../inputs';
import { GetCategoriesOuput } from '../output';
import { ICategoriesQuery, IGetCategoriesUsecase } from '../ports';

export class GetCategoriesUsecase implements IGetCategoriesUsecase {
  constructor(private readonly _categoryRepo: ICategoriesQuery) {}

  async execute(input: GetCategoriesInput): Promise<GetCategoriesOuput> {
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
  }
}
