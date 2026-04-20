import { LIVESTATUS } from '../../domain/enums';

export interface IGetScheduledLivesOutput {
  scheduledLives: IGetScheduledLives[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IGetScheduledLives {
  id: string;
  title: string;
  scheduledAt?: Date;
  status: LIVESTATUS;
}
