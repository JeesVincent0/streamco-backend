import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Adjust these imports based on your exact file structure
import { GetCategoriesDto } from '@/modules/category/presentation/dto';
import { CategoriesQueryPort } from '@/modules/category/application/ports';
import { Category } from '@/modules/category/domain/entity';
import { CategoryDocument } from '@/modules/category/infrastructure/schema';
import { CategoriesOuput } from '@/modules/category/application/output';

export class GetAllCategoriesRepository implements CategoriesQueryPort {
  constructor(
    @InjectModel('Categories')
    private readonly _categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(query: GetCategoriesDto): Promise<CategoriesOuput> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      order = 'asc',
      status,
      search,
    } = query;

    const skip = (page - 1) * limit;

    // 1. Base Filter Setup
    const filter: Record<string, any> = {};

    // Only apply status filter if it exists and isn't "all"
    if (status && status !== 'all') {
      filter.status = status;
    }

    // 2. Search logic
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    // 3. Sorting logic
    const sortField = sortBy && sortBy !== 'all' ? sortBy : 'createdAt';
    const sort: Record<string, 1 | -1> = {
      [sortField]: order === 'desc' ? -1 : 1,
    };

    // 4. Execute Queries
    const categories = await this._categoryModel
      .find(filter as Parameters<typeof this._categoryModel.find>[0])
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await this._categoryModel.countDocuments(
      filter as Parameters<typeof this._categoryModel.find>[0],
    );

    // 5. Return wrapped in 'data' to match CategoriesOuput type
    return {
      data: {
        // Cast the lean mongoose documents to your Domain Entity
        categories: categories as unknown as Category[],
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit) || 1, // Fallback to 1 page if total is 0
        },
      },
    };
  }
}
