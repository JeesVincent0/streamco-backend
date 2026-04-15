import { Model } from 'mongoose';
import { LiveDocument } from '../schema';
import { LiveMappers } from '../mappers';
import { Live } from '../../domain/entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ILiveRepo } from '../../application/ports';
import { IMonthlyLivesOutput } from '../../application/outputs';

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

  async findMonthlySummary(
    channelId: string,
    year: number,
    month: number,
  ): Promise<IMonthlyLivesOutput[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    return this.liveModel.aggregate([
      {
        $match: {
          channelId,
          status: 'SCHEDULED',
          scheduledAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$scheduledAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);
  }

  async findByDate(
    channelId: string,
    date: Date,
  ): Promise<(Live & { expectedEndAt: Date })[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.liveModel.find({
      channelId,
      status: 'SCHEDULED',
      scheduledAt: { $gte: start, $lte: end },
    });
  }
}
