import { ILogger } from '@/shared/logger';
import { UserRepositoryPort } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { Advertiser, BaseUser, User } from '@/modules/user/domain';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IGetUserProfileUseCase } from '../../ports/get-user/get-user-profile.usecase.port';

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: ILogger,
  ) {}
  async execute(input: { id: string; paramsId: string }): Promise<BaseUser> {
    let user: User | BaseUser | Advertiser | null;
    user = await this._userRepo.findById(input.paramsId);
    if (!user) {
      user = await this._userRepo.findById(input.id);
    }
    if (!user) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'GetUserProfileUseCase',
        userId: `${input.id}`,
      });
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    this._logger.log({
      event: LOG_EVENTS.USER_PROFILE_RETRIEVED,
      context: 'GetUserProfileUseCase',
      userId: `${input.id}`,
    });

    return user;
  }
}
