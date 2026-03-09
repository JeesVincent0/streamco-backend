import { GetAllUsersUseCase } from '../application/usecase/user-usecase';

export const AdminUsersProviders = [
  {
    provide: GetAllUsersUseCase,
    useFactory: () => {
      return new GetAllUsersUseCase();
    },
  },
];
