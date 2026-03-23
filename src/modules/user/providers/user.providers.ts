import {
  // Ports
  USER_REPOSITORY_PORT,

  // use cases
  CreateNormalUserUseCase,
  CreateAdvertiserUserUseCase,
  UserRepositoryPort,
  GetUserProfileUseCase,
  UPDATE_USER_EMAIL_PORT,
  ICheckUserExists,
  IUpdateUserBasicRepo,
  IUpdateUserEmailRepo,
} from '../application';
import { CreateUserWithGoogleAuthUseCase } from '../application';
import { GetBaseUserUseCase } from '../application/use-cases/get-user/get-base-user.usecase';
import { MongoRepository } from '../infrastructure/repositories/user-repository.impl';
import { FileLogger } from '@/shared/logger/file-logger';
import {
  UpdateUserBasicUseCase,
  UpdateUserEmailUseCase,
  UpdateUserSocialLinksUseCase,
  VerifyOtpEmailUpdateUseCase,
} from '../application/use-cases/update-user';
import {
  CheckUserExistsImplMongoRepository,
  UpdateUserBasicImplMonogoRepository,
  UpdateUserEmailImplMonogoRepository,
} from '../infrastructure';
import {
  SEND_OTP_USE_CASE,
  VERIFY_OTP_USE_CASE,
} from '@/shared/application/tokens';
import {
  SendOtpInterface,
  VerifyOtpInterface,
} from '@/shared/application/ports';
import { UpdateUserAvatarUlrUsecase } from '../application/use-cases/update-user/update-user-avatarurl.usecase';

// tokens
import {
  CREATE_USER_USE_CASE_TOKEN,
  CHECK_USER_EXISTS_REPO_TOKEN,
  GET_BASE_USER_USE_CASE_TOKEN,
  GET_USER_PROFILE_USE_CASE_TOKEN,
  CREATE_ADVERTISER_USE_CASE_TOKEN,
  UPDATE_USER_BASIC_USE_CASE_TOKEN,
  UPDATE_USER_EMAIL_USE_CASE_TOKEN,
  UPDATE_USER_AVATAR_URL_USE_CASE_TOKEN,
  VERIFY_OTP_EMAIL_UPDATE_USE_CASE_TOKEN,
  UPDATE_USER_SOCIAL_LINKS_USE_CASE_TOKEN,
  CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
  UPDATE_USER_BASIC_REPO_TOKEN,
} from '../application/user.tokens';

/*
 * UserProviders defines the providers for user-related use cases and repositories.
 */

export const userProviders = [
  {
    provide: UPDATE_USER_AVATAR_URL_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort, logger: FileLogger) => {
      return new UpdateUserAvatarUlrUsecase(userRepo, logger);
    },
    inject: [USER_REPOSITORY_PORT, FileLogger],
  },

  {
    provide: UPDATE_USER_SOCIAL_LINKS_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new UpdateUserSocialLinksUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },

  {
    provide: VERIFY_OTP_EMAIL_UPDATE_USE_CASE_TOKEN,
    useFactory: (
      verifyOtp: VerifyOtpInterface,
      updateUserEmail: IUpdateUserEmailRepo,
    ) => {
      return new VerifyOtpEmailUpdateUseCase(verifyOtp, updateUserEmail);
    },
    inject: [VERIFY_OTP_USE_CASE, UPDATE_USER_EMAIL_PORT],
  },

  {
    provide: GET_BASE_USER_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new GetBaseUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new CreateUserWithGoogleAuthUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },

  {
    provide: CREATE_ADVERTISER_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort) => {
      return new CreateAdvertiserUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: CREATE_USER_USE_CASE_TOKEN,
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
    provide: GET_USER_PROFILE_USE_CASE_TOKEN,
    useFactory: (userRepo: UserRepositoryPort, logger: FileLogger) => {
      return new GetUserProfileUseCase(userRepo, logger);
    },
    inject: [USER_REPOSITORY_PORT, FileLogger],
  },

  {
    provide: UPDATE_USER_EMAIL_USE_CASE_TOKEN,
    useFactory: (
      checkUserExists: ICheckUserExists,
      sendOtp: SendOtpInterface,
      logger: FileLogger,
    ) => {
      return new UpdateUserEmailUseCase(checkUserExists, sendOtp, logger);
    },
    inject: [CHECK_USER_EXISTS_REPO_TOKEN, SEND_OTP_USE_CASE, FileLogger],
  },

  {
    provide: UPDATE_USER_BASIC_USE_CASE_TOKEN,
    useFactory: (updateUserBasicPort: IUpdateUserBasicRepo) => {
      return new UpdateUserBasicUseCase(updateUserBasicPort);
    },
    inject: [UPDATE_USER_BASIC_REPO_TOKEN],
  },

  {
    provide: UPDATE_USER_BASIC_REPO_TOKEN,
    useClass: UpdateUserBasicImplMonogoRepository,
  },

  {
    provide: UPDATE_USER_EMAIL_PORT,
    useClass: UpdateUserEmailImplMonogoRepository,
  },

  {
    provide: CHECK_USER_EXISTS_REPO_TOKEN,
    useClass: CheckUserExistsImplMongoRepository,
  },
];
