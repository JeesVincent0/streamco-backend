import { GetAllChannelsUseCaseInPut } from '../../inputs';
import { GetAllChannelsUseCaseOutPut } from '../../output';
import { IGetAllChannelsRepository, IGetAllChannelsUseCase } from '../../ports';

export class GetAllChannelsUseCase implements IGetAllChannelsUseCase {
  constructor(private readonly _getChannelsRepo: IGetAllChannelsRepository) {}
  async execute(
    input: GetAllChannelsUseCaseInPut,
  ): Promise<GetAllChannelsUseCaseOutPut> {
    return await this._getChannelsRepo.execute(input);
  }
}
