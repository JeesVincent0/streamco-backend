import { GetAllUsersUseCase, IUserQuery } from '../application';
import {
  GET_ALL_USERS_QUERY_IMPL_TOKEN,
  GET_ALL_USERS_USE_CASE_TOKEN,
} from '../application/user.tokens';
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
];
