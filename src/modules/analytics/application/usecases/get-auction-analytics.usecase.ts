import { BadRequestError } from '@/shared/errors';
import { AdvertiserReponseMappers } from '../mappers';
import { IGetAuctionAnalyticsUsecase } from '../port';
import { IGetAuctionAnalyticsOutput } from '../output';
import { LIVESTATUS } from '@/modules/live/domain/enums';
import { ILiveRepo } from '@/modules/live/application/ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { IChannelRepo } from '@/modules/channels/application/ports';
import { ICategoryRepo } from '@/modules/category/application/ports';
import { CATEGORY_STATUS } from '@/modules/category/domain/enums/category-status.enum';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class GetAuctionAnalyticsUsecase implements IGetAuctionAnalyticsUsecase {
  constructor(
    private readonly _liveRepo: ILiveRepo,
    private readonly _channelRepo: IChannelRepo,
    private readonly _categoryRepo: ICategoryRepo,
    private readonly _storageService: IStorageService,
  ) {}
  async execute(input: {
    liveId: string;
  }): Promise<IGetAuctionAnalyticsOutput> {
    const scheduledLive = await this._liveRepo.findById(input.liveId);

    if (
      !scheduledLive ||
      scheduledLive.status !== LIVESTATUS.SCHEDULED ||
      !scheduledLive.isAuctionAvailable
    ) {
      throw new BadRequestError(ERROR_MESSAGES.LIVE_IS_CANCELLED);
    }

    const category = await this._categoryRepo.findById(
      scheduledLive.categoryId as string,
    );

    if (!category || category.status === CATEGORY_STATUS.BLOCKED) {
      throw new BadRequestError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    const channel = await this._channelRepo.findByChannelId(
      scheduledLive.channelId,
    );

    if (!channel) {
      throw new BadRequestError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }

    const finalResponse = await AdvertiserReponseMappers.toAuctionAnalytics(
      channel,
      category,
      scheduledLive,
      this._storageService,
    );

    return finalResponse;
  }
}
