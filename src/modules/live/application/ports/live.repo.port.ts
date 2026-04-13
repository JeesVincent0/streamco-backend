import { IBaseRepositoryPort } from '@/shared/application/ports';
import { Live } from '../../domain/entity';

export interface ILiveRepo extends IBaseRepositoryPort<Live> {
  findConflict(
    channelId: string,
    newStart: Date,
    newEnd: Date,
  ): Promise<boolean>;
}
