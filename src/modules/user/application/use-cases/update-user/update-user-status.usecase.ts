import {
  IUpdateUserStatusUseCase,
  UserRepositoryPort,
} from '@/modules/user/application';

import { ILogger } from '@/shared/logger';
import { BadRequestError } from '@/shared/errors';
import { UserStatus } from '@/modules/user/domain';
import { SucceessResType } from '@/shared/types/success-res.type';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

/*
 * Use case for updating the status of a user.
 * Logs the event after updating the status.
 */

export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: ILogger,
  ) {}
  async execute(
    userId: string,
    newStatus: UserStatus,
  ): Promise<SucceessResType> {
    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (newStatus === UserStatus.SUSPENDED) user.suspend();
    if (newStatus === UserStatus.DELETED) user.delete();
    if (newStatus === UserStatus.ACTIVE) user.activate();

    await this._userRepo.save(user);
    this._logger.log({
      event: LOG_EVENTS.USER_STATUS_UPDATED,
      context: 'UpdateUserStatusUseCase',
      userId,
      newStatus,
    });
    return {
      status: 'success',
      message: 'User status updated successfully',
    };
  }
}
