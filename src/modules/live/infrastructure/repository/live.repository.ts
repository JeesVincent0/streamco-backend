import { Model } from 'mongoose';
import { LiveDocument } from '../schema';
import { LiveMappers } from '../mappers';
import { Live } from '../../domain/entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LIVESTATUS } from '../../domain/enums';
import { ILiveRepo } from '../../application/ports';
import { IMonthlyLivesOutput } from '../../application/outputs';
import {
  IAdvertiserScheduledLivesInput,
  IGetScheduledLivesInput,
} from '../../application/inputs';

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

  async findByQueryScheduledLives(params: IGetScheduledLivesInput): Promise<{
    lives: Live[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const {
      channelId,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      status,
      search,
    } = params;

    const filter: Record<string, any> = {
      channelId,
    };

    //Status
    if (status && Object.values(LIVESTATUS).includes(status)) {
      filter.status = status;
    } else {
      filter.status = {
        $in: [LIVESTATUS.CANCELLED, LIVESTATUS.SCHEDULED],
      };
    }

    // Search
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: order === 'desc' ? -1 : 1,
    };

    const skip = (page - 1) * limit;

    const docs = await this.liveModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const lives = docs.map((doc) => LiveMappers.toDomain(doc));

    const total = await this.liveModel.countDocuments(filter);

    return {
      lives,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async scheduledLiveAutoCancel(liveId: string): Promise<void> {
    const live = await this.liveModel.findOne({ id: liveId });

    if (!live) return;

    if (live.status !== LIVESTATUS.SCHEDULED) return;

    live.status = LIVESTATUS.CANCELLED;
    await live.save();
  }

  async scheduledLivesForAdvertiser(
    params: IAdvertiserScheduledLivesInput,
  ): Promise<{
    scheduledLives: (Live & { channelName: string; categoryName: string })[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const {
      limit = 10,
      page = 1,
      order = 'desc',
      sortBy = 'createdAt',
      search,
      isAuctionStarted,
    } = params;

    const matchStage: {
      status: LIVESTATUS;
      isAuctionAvailable?: boolean;
      auctionStart?: { $lte: Date } | { $gt: Date };
      auctionEnds?: { $gt: Date };

      $or?: [
        { title: { $regex: string; $options: 'i' } },

        { description: { $regex: string; $options: 'i' } },
      ];
    } = {
      status: LIVESTATUS.SCHEDULED,
      isAuctionAvailable: true,
    };

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortDirection = order.toLowerCase() === 'desc' ? -1 : 1;

    if (isAuctionStarted !== undefined) {
      const now = new Date();

      if (isAuctionStarted === true) {
        matchStage.auctionStart = { $lte: now };
        matchStage.auctionEnds = { $gt: now };
      } else if (isAuctionStarted === false) {
        matchStage.auctionStart = { $gt: now };
      }
    }

    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'channels',
          localField: 'channelId',
          foreignField: 'channelId',
          as: 'channelData',
        },
      },
      {
        $unwind: {
          path: '$channelData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: 'id',
          as: 'categoryData',
        },
      },
      {
        $unwind: {
          path: '$categoryData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          channelName: '$channelData.channelName',
          categoryName: '$categoryData.name',
        },
      },
      {
        $project: {
          channelData: 0,
        },
      },
      { $sort: { [sortBy]: sortDirection } },
      { $skip: (page - 1) * limit },
      { $limit: Number(limit) },
    ];

    const results = await this.liveModel.aggregate(pipeline).exec();
    const totalRecords = await this.liveModel.countDocuments(matchStage).exec();

    const mappedResult = results.map(
      (doc: LiveDocument & { channelName: string; categoryName: string }) => {
        return LiveMappers.toDomainAdvertiserScheduledLives(doc);
      },
    );

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    return {
      scheduledLives: mappedResult,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  }
}
