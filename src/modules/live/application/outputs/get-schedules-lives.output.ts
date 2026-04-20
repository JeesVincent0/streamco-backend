import { LIVESTATUS } from '../../domain/enums';
import { IPagination } from '@/shared/application/output';

export interface IGetScheduledLivesOutput {
  scheduledLives: IGetScheduledLives[];
  pagination: IPagination;
}

export interface IGetScheduledLives {
  id: string;
  title: string;
  scheduledAt?: Date;
  status: LIVESTATUS;
}
