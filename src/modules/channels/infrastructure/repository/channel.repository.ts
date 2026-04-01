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
import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

interface IFilter {
  userId?: string;
  $or?: [
    { channelName: { $regex: string; $options: 'i' } },
    { channelId: { $regex: string; $options: 'i' } },
  ];
}

@Injectable()
export class ChannelRepository implements IChannelRepo {
  constructor(
    @InjectModel('Channel')
    private readonly _channelModel: Model<ChannelDocument>,

    @Inject(STORAGE_SERVICE_PORT_TOKEN)
    private readonly _storageService: IStorageService,
  ) {}

  async findChannelsWithPagination({
    skip,
    limit,
    search,
    userId,
  }: ChannelFilterParams): Promise<PaginatedChannelsResult> {
    const filter: IFilter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (search) {
      filter.$or = [
        { channelName: { $regex: search, $options: 'i' } },
        { channelId: { $regex: search, $options: 'i' } },
      ];
    }

    const [total, rawChannels] = await Promise.all([
      this._channelModel.countDocuments(filter),
      this._channelModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
    ]);

    const channels = await Promise.all(
      rawChannels.map(async (doc) => {
        if (
          doc.profileImageUrl &&
          doc.profileImageUrl.startsWith(
            'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
          )
        ) {
          doc.profileImageUrl = await this._storageService.getSignedViewUrl(
            doc.profileImageUrl,
          );
        }

        if (
          doc.backgroundBannerUrl &&
          doc.backgroundBannerUrl.startsWith(
            'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
          )
        ) {
          doc.backgroundBannerUrl = await this._storageService.getSignedViewUrl(
            doc.backgroundBannerUrl,
          );
        }

        return ChannelMapper.toDomain(doc);
      }),
    );

    return {
      total,
      channels,
    };
  }

  async findByChannelId(channelId: string): Promise<Channel | null> {
    const channelDoc = await this._channelModel.findOne({ channelId }).exec();

    if (!channelDoc) return null;
    if (
      channelDoc.profileImageUrl &&
      channelDoc.profileImageUrl.startsWith(
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
      )
    ) {
      channelDoc.profileImageUrl = await this._storageService.getSignedViewUrl(
        channelDoc.profileImageUrl,
      );
    }

    if (
      channelDoc.backgroundBannerUrl &&
      channelDoc.backgroundBannerUrl.startsWith(
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
      )
    ) {
      channelDoc.backgroundBannerUrl =
        await this._storageService.getSignedViewUrl(
          channelDoc.backgroundBannerUrl,
        );
    }

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
          returnDocument: 'after',
        })
        .exec();
    } else {
      const newChannel = new this._channelModel(persistenceData);
      await newChannel.save();
    }
  }
}
