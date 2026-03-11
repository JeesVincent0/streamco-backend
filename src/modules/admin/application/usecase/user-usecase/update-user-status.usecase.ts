import { UpdateUserStatusPort } from '@/modules/user/application';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { FileLogger } from '@/shared/logger/file-logger';

/*
 * Use case for updating the status of a user.
 * Logs the event after updating the status.
 */

export class UpdateUserStatusUseCase {
  constructor(
    private readonly _updateUserStatus: UpdateUserStatusPort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(
    userId: string,
    newStatus: string,
  ): Promise<{ status: string; message: string }> {
    await this._updateUserStatus.execute(userId, newStatus);
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
