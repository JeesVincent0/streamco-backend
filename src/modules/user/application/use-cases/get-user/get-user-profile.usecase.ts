import { UserResponse } from '@/shared/types';
import { UserRepositoryPort } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { GetUserProfileMapper } from '@/shared/mappers/get-user-profile.mapper';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { IGetUserProfileUseCase } from '../../ports/get-user/get-user-profile.usecase.port';

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: { id: string }): Promise<UserResponse> {
    const user = await this._userRepo.findById(input.id);
    if (!user) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'GetUserProfileUseCase',
        userId: `${input.id}`,
      });
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const responseData = GetUserProfileMapper.toResponse(user);
    if (!responseData) {
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

    return responseData;
  }
}
