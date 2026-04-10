import {
  GetAllUsersUseCase,
  IUserQuery,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '../application';

import {
  GET_ALL_USERS_QUERY_IMPL_TOKEN,
  GET_ALL_USERS_USE_CASE_TOKEN,
  UPDATE_USER_STATUS_USE_CASE_TOKEN,
} from '../application/user.tokens';

import { ILogger, LOGGER_TOKEN } from '@/shared/logger';
import { UpdateUserStatusUseCase } from '../application/use-cases/update-user';
import { GetAllUsersRepository } from '../infrastructure/repositories/get-all-users.impl';

export const adminProvide = [
  {
    provide: GET_ALL_USERS_USE_CASE_TOKEN,
    useFactory: (getAllUsers: IUserQuery) => {
      return new GetAllUsersUseCase(getAllUsers);
    },
    inject: [GET_ALL_USERS_QUERY_IMPL_TOKEN],
  },

  {
    provide: GET_ALL_USERS_QUERY_IMPL_TOKEN,
    useClass: GetAllUsersRepository,
  },
  {
    provide: UPDATE_USER_STATUS_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort, logger: ILogger) => {
      return new UpdateUserStatusUseCase(userRepo, logger);
    },
    inject: [USER_REPOSITORY_PORT, LOGGER_TOKEN],
  },
];
