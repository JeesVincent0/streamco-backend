import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetCategoriesDto } from '@/modules/category/presentation/dto';
import { ICategoriesQuery } from '@/modules/category/application/ports';
import { Category } from '@/modules/category/domain/entity';
import { CategoryDocument } from '@/modules/category/infrastructure/schema';
import { CategoriesOuput } from '@/modules/category/application/output';

export class GetAllCategoriesRepository implements ICategoriesQuery {
  constructor(
    @InjectModel('Categories')
    private readonly _categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(query: GetCategoriesDto): Promise<CategoriesOuput> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      status,
      search,
    } = query;

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const sortField = sortBy && sortBy !== 'all' ? sortBy : 'createdAt';
    const sort: Record<string, 1 | -1> = {
      [sortField]: order === 'desc' ? -1 : 1,
    };

    const categories = await this._categoryModel
      .find(filter as Parameters<typeof this._categoryModel.find>[0])
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await this._categoryModel.countDocuments(
      filter as Parameters<typeof this._categoryModel.find>[0],
    );

    return {
      data: {
        categories: categories as unknown as Category[],
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
    };
  }
}
