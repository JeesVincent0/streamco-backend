import { GetAllUsersUseCase } from '../application/usecase/user-usecase';
import { GET_ALL_USERS_PORT, UserQueryPort } from '@/modules/user/application';

export const AdminUsersProviders = [
  {
    provide: GetAllUsersUseCase,
    useFactory: (getAllUsersPort: UserQueryPort) => {
      return new GetAllUsersUseCase(getAllUsersPort);
    },
    inject: [GET_ALL_USERS_PORT],
  },
];
