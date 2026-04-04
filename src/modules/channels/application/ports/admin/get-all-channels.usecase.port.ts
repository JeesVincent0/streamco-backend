import { GetAllChannelsUseCaseInPut } from '../../inputs';
import { GetAllChannelsUseCaseOutPut } from '../../output';

export interface IGetAllChannelsUseCase {
  execute(
    input: GetAllChannelsUseCaseInPut,
  ): Promise<GetAllChannelsUseCaseOutPut>;
}
