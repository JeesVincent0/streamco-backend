import { UserRepositoryPort } from '@/modules/user/application';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { BadRequestError } from '@/shared/errors';
import { FileLogger } from '@/shared/logger/file-logger';
import { UserResponse } from '../../types';
import { GetUserDetailsMapper } from '../../mappers';

/*
 *
 * GetUserByIdUseCase is responsible for retrieving detailed information about a specific user by their ID.
 * It interacts with the UserRepositoryPort to fetch the user data and uses the FileLogger to log important events.
 * The use case returns a UserResponse object containing the user's details if found, or throws a BadRequestError if
 * the user is not found or if the user type is unsupported.
 *
 */

export class GetUserByIdUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _logger: FileLogger,
  ) {}

  async execute(id: string): Promise<UserResponse> {
    const user = await this._userRepo.findById(id);

    if (!user) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'GetUserByIdUseCase',
        userId: id,
      });

      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const responseData = GetUserDetailsMapper.toResponse(user);
    if (!responseData) {
      throw new BadRequestError(ERROR_MESSAGES.UNSUPPORTED_USER_TYPE);
    }

    this._logger.log({
      event: LOG_EVENTS.FETCH_USER_BY_ID,
      context: 'GetUserByIdUseCase',
      userId: id,
    });

    return responseData;
  }
}
