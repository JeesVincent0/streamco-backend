import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from '../../domain/entity';
import { ChannelRepoPort } from '../../application/ports';
import { ChannelDocument } from '../schema';
import { ChannelMapper } from '../mappers/channel.mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelRepository implements ChannelRepoPort {
  constructor(
    @InjectModel('Channel')
    private readonly _channelModel: Model<ChannelDocument>,
  ) {}

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
