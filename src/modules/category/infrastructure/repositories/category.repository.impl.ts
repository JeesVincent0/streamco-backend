import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { CategoryRepoPort } from '../../application/ports/category-repository.port';
import { Category } from '../../domain/entity';
import { CategoryDocument } from '../schema';
import { CategoryMapper } from '../mappers';

@Injectable()
export class CategoryRepositoryImplMonogoDB implements CategoryRepoPort {
  constructor(
    @InjectModel('Categories')
    private readonly _categoryModel: Model<CategoryDocument>,
  ) {}

  async findById(id: string): Promise<Category | null> {
    const document = await this._categoryModel.findOne({ id }).lean().exec();
    if (!document) return null;

    return CategoryMapper.toDomain(document);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const document = await this._categoryModel.findOne({ slug }).lean().exec();
    if (!document) return null;

    return CategoryMapper.toDomain(document);
  }

  async findAll(): Promise<Category[]> {
    const documents = await this._categoryModel.find().lean().exec();
    return documents.map((doc) => CategoryMapper.toDomain(doc));
  }

  async save(entity: Category): Promise<Category> {
    const persistenceData = CategoryMapper.toPersistence(entity);

    const savedDocument = await this._categoryModel
      .findOneAndUpdate(
        { id: persistenceData.id },
        { $set: persistenceData },
        { new: true, upsert: true },
      )
      .lean()
      .exec();

    return CategoryMapper.toDomain(savedDocument);
  }
}
