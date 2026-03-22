import { BadRequestError } from '@/shared/errors';
import { UserRepositoryPort } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { UserResponseMapper } from '../../mappers';
import { IGetBaseUserUseCase } from '../../ports/get-user';
import { IGetBaseUserOutput } from '../../output';

export class GetBaseUserUseCase implements IGetBaseUserUseCase {
  constructor(private readonly _useRepo: UserRepositoryPort) {}
  async execute(input: {
    id: string;
  }): Promise<{ status: string; message: string; data: IGetBaseUserOutput }> {
    const user = await this._useRepo.findById(input.id);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const baseUserResponse = UserResponseMapper.toBaseUserOutput(user);
    return {
      status: 'success',
      message: 'Data fetched successfully',
      data: baseUserResponse,
    };
  }
}
