import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
} from '@/modules/user/application';
import {
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../application/use-cases';
import { BcryptPasswordHasherImpl } from '../infrastructure';
import { PASSWORD_HASHER_PORT } from '../application';

export const signupProvider = [
  {
    provide: SignupNormalUserUseCase,
    useFactory: (createNormalUser) => {
      return new SignupNormalUserUseCase(createNormalUser);
    },
    inject: [CREATE_NORMAL_USER_PORT],
  },

  {
    provide: SignupAdvertiserUseCase,
    useFactory: (createAdvertiserUser) => {
      return new SignupAdvertiserUseCase(createAdvertiserUser);
    },
    inject: [CREATE_ADVERTISER_USER_PORT],
  },

  {
    provide: PASSWORD_HASHER_PORT,
    useClass: BcryptPasswordHasherImpl,
  },
];
