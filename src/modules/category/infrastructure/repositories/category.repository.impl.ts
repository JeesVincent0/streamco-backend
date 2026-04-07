import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { ICategoryRepo } from '../../application/ports/category-repository.port';
import { Category } from '../../domain/entity';
import { CategoryDocument } from '../schema';
import { CategoryMapper } from '../mappers';
import { Slug } from '../../domain/value-objects';

@Injectable()
export class CategoryRepositoryImplMonogoDB implements ICategoryRepo {
  constructor(
    @InjectModel('Categories')
    private readonly _categoryModel: Model<CategoryDocument>,
  ) {}

  async findById(id: string): Promise<Category | null> {
    const document = await this._categoryModel.findOne({ id }).lean().exec();
    if (!document) return null;

    return CategoryMapper.toDomain(document);
  }

  async findBySlug(slug: Slug): Promise<Category | null> {
    const document = await this._categoryModel
      .findOne({ slug: slug.getValue() })
      .lean()
      .exec();
    if (!document) return null;

    return CategoryMapper.toDomain(document);
  }

  async save(entity: Category): Promise<Category> {
    const persistenceData = CategoryMapper.toPersistence(entity);

    const savedDocument = await this._categoryModel
      .findOneAndUpdate(
        { id: persistenceData.id },
        { $set: persistenceData },
        { returnDocument: 'after', upsert: true },
      )
      .lean()
      .exec();

    return CategoryMapper.toDomain(savedDocument);
  }
}
