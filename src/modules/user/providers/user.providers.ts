import {
  // Ports
  USER_REPOSITORY_PORT,
  CREATE_NORMAL_USER_PORT,
  CREATE_ADVERTISER_USER_PORT,

  // use cases
  CreateNormalUserUseCase,
  CreateAdvertiserUserUseCase,
} from '../application';
import { MongoRepository } from '../infrastructure/repositories/user-repository.impl';

export const userProviders = [
  {
    provide: CREATE_ADVERTISER_USER_PORT,
    useFactory: () => {
      return new CreateAdvertiserUserUseCase();
    },
    inject: [],
  },
  {
    provide: CREATE_NORMAL_USER_PORT,
    useFactory: (userRepo) => {
      return new CreateNormalUserUseCase(userRepo);
    },
    inject: [USER_REPOSITORY_PORT],
  },
  {
    provide: USER_REPOSITORY_PORT,
    useClass: MongoRepository,
  },
];
