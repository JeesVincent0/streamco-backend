import { ICancelScheduledLiveInput } from '../../inputs';

export interface ICancelScheduledLiveUsecase {
  execute(input: ICancelScheduledLiveInput): Promise<void>;
}
