import { UserRepositoryPort } from '../../ports';
import { BadRequestError } from '@/shared/errors';
import { IGetBaseUserUseCase } from '../../ports/get-user';
import { Advertiser, BaseUser, User } from '@/modules/user/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class GetBaseUserUseCase implements IGetBaseUserUseCase {
  constructor(private readonly _useRepo: UserRepositoryPort) {}
  async execute(input: { id: string }): Promise<User | BaseUser | Advertiser> {
    const user = await this._useRepo.findById(input.id);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }
}
