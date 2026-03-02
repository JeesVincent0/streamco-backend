import { BadRequestError } from '@/shared/errors';
import { UserResponseMapper } from '../../mappers';
import { UserRepositoryPort } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class GetBaseUserUseCase {
  constructor(private readonly _useRepo: UserRepositoryPort) {}
  async execute(input: { id: string }) {
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
