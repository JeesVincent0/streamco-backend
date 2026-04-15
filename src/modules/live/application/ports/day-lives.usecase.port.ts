import { Live } from '../../domain/entity';
import { IDayLivesInput } from '../inputs';

export interface IDayLivesUsecase {
  execute(input: IDayLivesInput): Promise<(Live & { expectedEndAt: Date })[]>;
}
