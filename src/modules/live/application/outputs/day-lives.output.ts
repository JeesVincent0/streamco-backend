import { LIVESTATUS } from '../../domain/enums';

export interface IDayLiveOutput {
  id: string;
  title: string;
  status: LIVESTATUS;
  scheduleAt?: Date;
  thumbnailUrl?: string;
  expectedEndAt: Date;
}
