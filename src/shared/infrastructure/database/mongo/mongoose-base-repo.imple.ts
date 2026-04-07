import { Model } from 'mongoose';
import { IBaseRepositoryPort } from '@/shared/application/ports';

export class MongooseBaseRepositoryImpl<T> implements IBaseRepositoryPort<T> {
  constructor(private readonly _model: Model<T>) {}

  async save(entity: T): Promise<T> {
    return await this._model.create(entity);
  }

  async findById(id: string): Promise<T | null> {
    return await this._model.findOne({ id }).lean();
  }
}
