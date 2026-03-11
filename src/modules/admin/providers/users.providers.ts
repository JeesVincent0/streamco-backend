import { GetAllUsersUseCase } from '../application/usecase/user-usecase';
import {
  GET_ALL_USERS_PORT,
  UPDATE_USER_STATUS_PORT,
  UpdateUserStatusPort,
  UserQueryPort,
} from '@/modules/user/application';
import { UpdateUserStatusUseCase } from '../application/usecase/user-usecase/update-user-status.usecase';
import { FileLogger } from '@/shared/logger/file-logger';

/*
 * AdminUsersProviders defines the providers for administrative user management use cases.
 * 1. GetAllUsersUseCase - Retrieves a paginated list of users with optional filtering and sorting.
 * 2. UpdateUserStatusUseCase - Updates the status of a specific user (ACTIVE, SUSPENDED, DELETED).
 */

export const AdminUsersProviders = [
  {
    provide: GetAllUsersUseCase,
    useFactory: (getAllUsersPort: UserQueryPort) => {
      return new GetAllUsersUseCase(getAllUsersPort);
    },
    inject: [GET_ALL_USERS_PORT],
  },

  {
    provide: UpdateUserStatusUseCase,
    useFactory: (
      updateUserStatusPort: UpdateUserStatusPort,
      logger: FileLogger,
    ) => {
      return new UpdateUserStatusUseCase(updateUserStatusPort, logger);
    },
    inject: [UPDATE_USER_STATUS_PORT, FileLogger],
  },
];
