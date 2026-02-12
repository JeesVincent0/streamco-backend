import {
  CREATE_ADVERTISER_USER_USE_CASE,
  CREATE_NORMAL_USER_USE_CASE,
  CreateAdvertiserUserUseCase,
  CreateNormalUserUseCase,
} from '../application';

export const userProviders = [
  {
    provide: CREATE_ADVERTISER_USER_USE_CASE,
    useFactory: () => {
      return new CreateAdvertiserUserUseCase();
    },
    inject: [],
  },
  {
    provide: CREATE_NORMAL_USER_USE_CASE,
    useFactory: () => {
      return new CreateNormalUserUseCase();
    },
    inject: [],
  },
];
