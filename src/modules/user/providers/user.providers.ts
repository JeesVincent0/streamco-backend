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
  UPDATE_USER_EMAIL_USE_CASE,
  UPDATE_USER_BASIC_USE_CASE,
  UPDATE_USER_BASIC_PORT,
  UPDATE_USER_EMAIL_PORT,
} from '../application';
import { CreateUserWithGoogleAuthUseCase } from '../application';
import { GetBaseUserUseCase } from '../application/use-cases/get-user/get-base-user.usecase';
import { MongoRepository } from '../infrastructure/repositories/user-repository.impl';
import { GetAllUsersRepository } from '../infrastructure/repositories/get-all-users.impl';
import { UpdateUserStatusMongoRepository } from '../infrastructure/repositories/update-user-status.impl';
import { FileLogger } from '@/shared/logger/file-logger';
import {
  UpdateUserBasicUseCase,
  UpdateUserEmailUseCase,
} from '../application/use-cases/update-user';
import {
  UpdateUserBasicImplMonogoRepository,
  UpdateUserEmailImplMonogoRepository,
} from '../infrastructure';
import { UpdateUserBasicPort } from '../application/ports/repository/update-user-basic.port';

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
 * 9. UpdateUserBasicUseCase - Use case for updating basic user information.
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

  {
    provide: UPDATE_USER_EMAIL_USE_CASE,
    useFactory: () => {
      return new UpdateUserEmailUseCase();
    },
    inject: [],
  },

  {
    provide: UPDATE_USER_BASIC_USE_CASE,
    useFactory: (updateUserBasicPort: UpdateUserBasicPort) => {
      return new UpdateUserBasicUseCase(updateUserBasicPort);
    },
    inject: [UPDATE_USER_BASIC_PORT],
  },

  {
    provide: UPDATE_USER_BASIC_PORT,
    useClass: UpdateUserBasicImplMonogoRepository,
  },

  {
    provide: UPDATE_USER_EMAIL_PORT,
    useClass: UpdateUserEmailImplMonogoRepository,
  },
];
