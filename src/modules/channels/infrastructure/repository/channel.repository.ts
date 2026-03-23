import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from '../../domain/entity';
import {
  ChannelFilterParams,
  IChannelRepo,
  PaginatedChannelsResult,
} from '../../application/ports';
import { ChannelDocument } from '../schema';
import { ChannelMapper } from '../mappers/channel.mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelRepository implements IChannelRepo {
  constructor(
    @InjectModel('Channel')
    private readonly _channelModel: Model<ChannelDocument>,
  ) {}

  async findChannelsWithPagination({
    skip,
    limit,
    search,
    userId,
  }: ChannelFilterParams): Promise<PaginatedChannelsResult> {
    const filter: any = {};

    // 1. Filter by specific user if requested
    if (userId) {
      filter.userId = userId;
    }

    // 2. Apply Search if user typed something
    if (search) {
      filter.$or = [
        { channelName: { $regex: search, $options: 'i' } },
        { channelId: { $regex: search, $options: 'i' } },
      ];
    }

    // 3. Run queries in parallel for performance
    const [total, rawChannels] = await Promise.all([
      this._channelModel.countDocuments(filter),
      this._channelModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
    ]);

    // 4. Map DB Documents back to pure Domain Entities
    return {
      total,
      channels: rawChannels.map((doc) => ChannelMapper.toDomain(doc)),
    };
  }

  async findByChannelId(channelId: string): Promise<Channel | null> {
    const channelDoc = await this._channelModel.findOne({ channelId }).exec();

    if (!channelDoc) return null;

    return ChannelMapper.toDomain(channelDoc);
  }

  async findByUserId(userId: string): Promise<Channel | null> {
    const channelDoc = await this._channelModel.findOne({ userId }).exec();

    if (!channelDoc) return null;

    return ChannelMapper.toDomain(channelDoc);
  }

  async save(channel: Channel): Promise<void> {
    const persistenceData = ChannelMapper.toPersistence(channel);

    if (channel.id) {
      await this._channelModel
        .findOneAndUpdate({ id: channel.id }, persistenceData, {
          upsert: true,
          new: true,
        })
        .exec();
    } else {
      const newChannel = new this._channelModel(persistenceData);
      await newChannel.save();
    }
  }
}
