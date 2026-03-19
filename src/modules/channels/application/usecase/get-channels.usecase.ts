// application/usecase/get-channels.usecase.ts
import { GetChannelsInput } from '../inputs/get-channels.input';
import { GetChannelsOutput } from '../output';
import { ChannelRepoPort, GetChannelsPort } from '../ports';
import { ChannelMapper } from '../../infrastructure/mappers/channel.mappers';

export class GetChannelsUsecase implements GetChannelsPort {
  constructor(private readonly _channelRepo: ChannelRepoPort) {}

  async execute(input: GetChannelsInput): Promise<GetChannelsOutput> {
    const { page, limit, search, userId } = input;

    // 1. Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // 2. Fetch from DB
    const { channels, total } =
      await this._channelRepo.findChannelsWithPagination({
        skip,
        limit,
        search,
        userId,
      });

    // 3. Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // 4. Convert Domain Entities to plain JSON objects for the HTTP response
    const plainChannels = channels.map((channel) =>
      ChannelMapper.toPersistence(channel),
    );

    return {
      status: 'success',
      data: {
        channels: plainChannels,
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
