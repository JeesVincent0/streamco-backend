import {
  // Ports
  USER_REPOSITORY_PORT,
  CREATE_NORMAL_USER_PORT,
  CREATE_ADVERTISER_USER_PORT,

  // use cases
  CreateNormalUserUseCase,
  CreateAdvertiserUserUseCase,
  UserRepositoryPort,
  CREATE_USER_WITH_GOOGLE_AUTH_PORT,
  GET_ALL_USERS_PORT,
} from '../application';
import { CreateUserWithGoogleAuthUseCase } from '../application';
import { GetBaseUserUseCase } from '../application/use-cases/get-user/get-base-user.usecase';
import { MongoRepository } from '../infrastructure/repositories/user-repository.impl';
import { GetAllUsersRepository } from '../infrastructure/repositories/get-all-users.impl';

export const userProviders = [
  {
    provide: GetBaseUserUseCase,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new GetBaseUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: CREATE_USER_WITH_GOOGLE_AUTH_PORT,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new CreateUserWithGoogleAuthUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },

  {
    provide: CREATE_ADVERTISER_USER_PORT,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new CreateAdvertiserUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: CREATE_NORMAL_USER_PORT,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new CreateNormalUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: USER_REPOSITORY_PORT,
    useClass: MongoRepository,
  },

  {
    provide: GET_ALL_USERS_PORT,
    useClass: GetAllUsersRepository,
  },
];
