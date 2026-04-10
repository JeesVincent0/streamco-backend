import { ILogger } from '@/shared/logger';
import { BadRequestError } from '@/shared/errors';
import type { UserRepositoryPort } from '../../ports';
import { SucceessResType } from '@/shared/types/success-res.type';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IUpdateUserAvatarUlrUsecase } from '../../ports/update-user';
import { UpdateAvatarUrlType } from '../../inputs/update-user/update-user-avatar.input';

export class UpdateUserAvatarUlrUsecase implements IUpdateUserAvatarUlrUsecase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: ILogger,
  ) {}
  async execute(input: UpdateAvatarUrlType): Promise<SucceessResType> {
    const user = await this._userRepo.findById(input.userId);
    if (!user) {
      this._logger.log({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'UpdateUserAvatarUlrUsecase',
        userId: input.userId,
      });
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    user.changeAvatarUrl(input.avatarUrl);

    await this._userRepo.save(user);
    this._logger.log({
      event: LOG_EVENTS.USER_AVATARURL_CHANGED,
      context: 'UpdateUserAvatarUlrUsecase',
      userId: input.userId,
    });

    return {
      status: 'success',
      message: 'User avatar updated successfully',
    };
  }
}
