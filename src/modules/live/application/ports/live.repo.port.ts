import { Live } from '../../domain/entity';
import { IBaseRepositoryPort } from '@/shared/application/ports';
import { IMonthlyLivesOutput } from '../outputs';

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
}
