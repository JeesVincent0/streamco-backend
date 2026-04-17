import { Live } from '../../../domain/entity';
import { IBaseRepositoryPort } from '@/shared/application/ports';
import { IMonthlyLivesOutput } from '../../outputs';
import { IGetScheduledLivesInput } from '../../inputs';

export interface ILiveRepo extends IBaseRepositoryPort<Live> {
  findConflict(
    channelId: string,
    newStart: Date,
    newEnd: Date,
  ): Promise<boolean>;

  findMonthlySummary(
    channelId: string,
    year: number,
    month: number,
  ): Promise<IMonthlyLivesOutput[]>;

  findByDate(
    channeId: string,
    date: Date,
  ): Promise<(Live & { expectedEndAt: Date })[]>;

  findByQueryScheduledLives(params: IGetScheduledLivesInput): Promise<{
    lives: Live[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}
