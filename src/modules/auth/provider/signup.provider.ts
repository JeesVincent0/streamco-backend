import {
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../application/use-cases';

export const signupProvider = [
  {
    provide: SignupNormalUserUseCase,
    useFactory: () => {
      return new SignupNormalUserUseCase();
    },
    inject: [],
  },

  {
    provide: SignupAdvertiserUseCase,
    useFactory: () => {
      return new SignupAdvertiserUseCase();
    },
    inject: [],
  },
];
