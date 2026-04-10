// application/usecase/get-channels.usecase.ts
import { GetChannelsOutput } from '../output';
import { IChannelRepo, IGetChannelsUseCase } from '../ports';
import { GetChannelsInput } from '../inputs/get-channels.input';

export class GetChannelsUsecase implements IGetChannelsUseCase {
  constructor(private readonly _channelRepo: IChannelRepo) {}

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

    const totalPages = Math.ceil(total / limit);

    return {
      channels,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
