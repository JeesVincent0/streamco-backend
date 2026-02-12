import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  CreateAdvertiserUserUseCase,
  CreateNormalUserUseCase,
} from '../application';

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
    useFactory: () => {
      return new CreateNormalUserUseCase();
    },
    inject: [],
  },
];
