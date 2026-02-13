import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '@/modules/user/application';
import {
  GenerateOtpUseCase,
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
} from '../application/use-cases';
import { BcryptPasswordHasherImpl } from '../infrastructure';
import { OTP_SERVICE, OtpService, PASSWORD_HASHER_PORT } from '../application';
import { GENERATE_OTP_USE_CASE } from '../application/use-cases/tokens.usecase';

export const signupProvider = [
  {
    provide: SignupNormalUserUseCase,
    useFactory: (
      createNormalUser,
      passwordHasher,
      generateOtpUseCase: GenerateOtpUseCase,
    ) => {
      return new SignupNormalUserUseCase(
        createNormalUser,
        passwordHasher,
        generateOtpUseCase,
      );
    },
    inject: [
      CREATE_NORMAL_USER_PORT,
      PASSWORD_HASHER_PORT,
      GENERATE_OTP_USE_CASE,
    ],
  },

  {
    provide: GENERATE_OTP_USE_CASE,
    useFactory: (otpService, userRepo, passwordHasher) => {
      return new GenerateOtpUseCase(otpService, userRepo, passwordHasher);
    },
    inject: [OTP_SERVICE, USER_REPOSITORY_PORT, PASSWORD_HASHER_PORT],
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

  {
    provide: OTP_SERVICE,
    useClass: OtpService,
  },

  {
    provide: USER_REPOSITORY_PORT,
    useClass: UserRepositoryPort,
  },
];
