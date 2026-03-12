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
  UPDATE_USER_STATUS_PORT,
  GET_USER_PROFILE_INTERFACE_PORT,
  GetUserProfileUseCase,
} from '../application';
import { CreateUserWithGoogleAuthUseCase } from '../application';
import { GetBaseUserUseCase } from '../application/use-cases/get-user/get-base-user.usecase';
import { MongoRepository } from '../infrastructure/repositories/user-repository.impl';
import { GetAllUsersRepository } from '../infrastructure/repositories/get-all-users.impl';
import { UpdateUserStatusMongoRepository } from '../infrastructure/repositories/update-user-status.impl';
import { FileLogger } from '@/shared/logger/file-logger';

/*
 * UserProviders defines the providers for user-related use cases and repositories.
 * 1. GetBaseUserUseCase - Retrieves basic user information based on user ID.
 * 2. CreateUserWithGoogleAuthUseCase - Creates a new user using Google authentication.
 * 3. CreateAdvertiserUserUseCase - Creates a new advertiser user.
 * 4. CreateNormalUserUseCase - Creates a new normal user.
 * 5. UserRepositoryPort - Interface for user repository operations, implemented by MongoRepository.
 * 6. GetAllUsersRepository - Repository for retrieving all users with pagination and filtering.
 * 7. UpdateUserStatusMongoRepository - Repository for updating user status in MongoDB.
 * 8. GetUserProfileUseCase - Use case for retrieving user profile information, implemented with a logger.
 */

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

  {
    provide: UPDATE_USER_STATUS_PORT,
    useClass: UpdateUserStatusMongoRepository,
  },
  {
    provide: GET_USER_PROFILE_INTERFACE_PORT,
    useFactory: (userRepo: UserRepositoryPort, logger: FileLogger) => {
      return new GetUserProfileUseCase(userRepo, logger);
    },
    inject: [USER_REPOSITORY_PORT, FileLogger],
  },
];
