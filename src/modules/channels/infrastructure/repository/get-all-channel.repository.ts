import { Model } from 'mongoose';
import { ChannelMapper } from '../mappers';
import { ChannelDocument } from '../schema';
import { Channel } from '../../domain/entity';
import { InjectModel } from '@nestjs/mongoose';
import { CHANNEL_STATUS } from '../../domain/enums';
import { IGetAllChannelsRepository } from '../../application/ports';
import { GetAllChannelsUseCaseInPut } from '../../application/inputs';

export class GetAllChannelsRepositoryImpl implements IGetAllChannelsRepository {
  constructor(
    @InjectModel('Channel')
    private readonly _channelModel: Model<ChannelDocument>,
  ) {}
  async execute(query: GetAllChannelsUseCaseInPut): Promise<{
    channels: Channel[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      isLive,
      status,
      search,
    } = query;

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (Object.values(CHANNEL_STATUS).includes(status as CHANNEL_STATUS)) {
      filter.status = status;
    }

    if (typeof isLive === 'boolean') {
      filter.isLive = isLive;
    }

    if (search) {
      filter.$or = [
        { channelName: { $regex: search, $options: 'i' } },
        { channelId: { $regex: search, $options: 'i' } },
      ];
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: order === 'desc' ? -1 : 1,
    };

    const channelsDocs = await this._channelModel
      .find(filter as Parameters<typeof this._channelModel.find>[0])
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const channels = channelsDocs.map((doc) => {
      return ChannelMapper.toDomain(doc);
    });

    const total = await this._channelModel.countDocuments(
      filter as Parameters<typeof this._channelModel.find>,
    );

    return {
      channels,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }
}
