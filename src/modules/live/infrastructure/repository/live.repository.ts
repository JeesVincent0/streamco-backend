import { Model } from 'mongoose';
import { LiveDocument } from '../schema';
import { LiveMappers } from '../mappers';
import { Live } from '../../domain/entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ILiveRepo } from '../../application/ports';

@Injectable()
export class LiveRepositoryMongooseImpl implements ILiveRepo {
  constructor(
    @InjectModel('Live')
    private readonly liveModel: Model<LiveDocument>,
  ) {}

  async save(entity: Live): Promise<Live> {
    const data = LiveMappers.toPersistence(entity);

    const doc = await this.liveModel.findOneAndUpdate({ id: entity.id }, data, {
      returnDocument: 'after',
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return LiveMappers.toDomain(doc);
  }

  async findById(id: string): Promise<Live | null> {
    const doc = await this.liveModel.findOne({ id });

    if (!doc) return null;

    return LiveMappers.toDomain(doc);
  }

  async findConflict(
    channelId: string,
    newStart: Date,
    newEnd: Date,
  ): Promise<boolean> {
    const doc = await this.liveModel.findOne({
      channelId,
      status: 'SCHEDULED',

      scheduledAt: { $lt: newEnd },
      expectedEndAt: { $gt: newStart },
    });

    return !!doc;
  }
}
