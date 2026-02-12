// import { RegisterUserUseCase } from '../application/use-cases/registration/user-register.usecase';

// import { PasswordHasher } from '../application/ports/password-hasher';
// import { MailService } from '../application/ports/mail.service.port';
// import { OtpService } from '../application/ports/otp.service.port';
// import { AuthCachedUserRepository } from '../application/ports/user-cache-repository';

// import { BcryptPasswordHasher } from '../infrastructure/security/bcrypt-password-hasher';
// import { NodemailerService } from '../infrastructure/mail/nodemialer-service';
// import { OtpGenerator } from '../infrastructure/otp/otp-service';

// import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';
// import { UserRepository } from '@/modules/user/application/ports';
// import { FileLogger } from '@/shared/logger/file-logger';
// import { OtpVerificationUseCase } from '../application/use-cases/otp-verification.usecase';
// import { IdGenerator } from '../application/ports';
// import { CryptoIdGenerator } from '../infrastructure/otp/id-service';
// import { GetOtpTimerUseCase, ResendOtpUseCase } from '../application/use-cases';
// import { SigninUseCase } from '../application/use-cases/user-signin.usecase';
// import { GenerateOtpUseCase } from '../application/use-cases/otp/generate-otp.usecase';
// import { VerifyOtpUseCase } from '../application/use-cases/otp/verify-otp.usecase';
// import { ConfirmRegistrationUseCase } from '../application/use-cases/registration/confirm-registration.usecase';
// import { MAIL_SERVICE } from '../application/ports/tokens.port';

// export const authProviders = [
//   /**
//    * Use case factory
//    */

//   // Use Case factory for - OTP verification

//   // Confirm registration use case factory which is responsible for confirming user registration by verifying the OTP
//   {
//     provide: ConfirmRegistrationUseCase,
//     useFactory: (
//       userRepository: UserRepository,
//       verifyOtpUseCase: VerifyOtpUseCase,
//     ) => {
//       return new ConfirmRegistrationUseCase(userRepository, verifyOtpUseCase);
//     },
//     inject: [UserRepository, VerifyOtpUseCase],
//   },

//   // OTP verification use case factory which is responsible for verifying the OTP provided by the user during registration, signin, and other OTP related operations
//   {
//     provide: VerifyOtpUseCase,
//     useFactory: (
//       authCachedUserRepository: AuthCachedUserRepository,
//       otpHasher: PasswordHasher,
//     ) => {
//       return new VerifyOtpUseCase(authCachedUserRepository, otpHasher);
//     },
//     inject: [AuthCachedUserRepository, PasswordHasher],
//   },

//   // OTP generation use case factory which is responsible for generating OTP, hashing it, saving it in the cache, and sending it to the user's email during registration and other OTP related operations
//   {
//     provide: GenerateOtpUseCase,
//     useFactory: (
//       otpRepository: OtpService,
//       userRepository: UserRepository,
//       passwordHasher: PasswordHasher,
//       cacheRepository: AuthCachedUserRepository,
//       mailService: MailService,
//     ) => {
//       return new GenerateOtpUseCase(
//         otpRepository,
//         userRepository,
//         passwordHasher,
//         cacheRepository,
//         mailService,
//       );
//     },
//     inject: [
//       OtpService,
//       UserRepository,
//       PasswordHasher,
//       AuthCachedUserRepository,
//       MAIL_SERVICE,
//     ],
//   },

//   // Signin use case factory which is responsible for authenticating the user by verifying the email and password
//   {
//     provide: SigninUseCase,
//     useFactory: (
//       userRepository: UserRepository,
//       passwordHasher: PasswordHasher,
//     ) => {
//       return new SigninUseCase(userRepository, passwordHasher);
//     },
//     inject: [UserRepository, PasswordHasher],
//   },

//   // Resend OTP use case factory which is responsible for resending the OTP to the user's email by generating a new OTP, hashing it, updating it in the cache, and sending it to the user's email
//   {
//     provide: ResendOtpUseCase,
//     useFactory: (
//       cachedRepository: AuthCachedUserRepository,
//       otpService: OtpService,
//       otpHasher: PasswordHasher,
//       mailService: MailService,
//     ) => {
//       return new ResendOtpUseCase(
//         cachedRepository,
//         otpService,
//         otpHasher,
//         mailService,
//       );
//     },
//     inject: [
//       AuthCachedUserRepository,
//       OtpService,
//       PasswordHasher,
//       MAIL_SERVICE,
//     ],
//   },
//   {
//     provide: GetOtpTimerUseCase,
//     useFactory: (cachedRepository: AuthCachedUserRepository) => {
//       return new GetOtpTimerUseCase(cachedRepository);
//     },
//     inject: [AuthCachedUserRepository],
//   },
//   {
//     provide: OtpVerificationUseCase,
//     useFactory: (
//       authCachedUserRepository: AuthCachedUserRepository,
//       userRepository: UserRepository,
//       passwordHasher: PasswordHasher,
//     ) => {
//       return new OtpVerificationUseCase(
//         authCachedUserRepository,
//         userRepository,
//         passwordHasher,
//       );
//     },
//     inject: [AuthCachedUserRepository, UserRepository, PasswordHasher],
//   },

//   // Use case factory for - Normal User registration
//   {
//     provide: RegisterUserUseCase,
//     useFactory: (
//       generateOtpUseCase: GenerateOtpUseCase,
//       userRepository: UserRepository,
//       passwordHasher: PasswordHasher,
//     ) => {
//       return new RegisterUserUseCase(
//         generateOtpUseCase,
//         userRepository,
//         passwordHasher,
//       );
//     },
//     inject: [GenerateOtpUseCase, UserRepository, PasswordHasher],
//   },

//   /**
//    * Infrastructure bindings
//    */
//   {
//     provide: PasswordHasher,
//     useClass: BcryptPasswordHasher,
//   },
//   {
//     provide: MAIL_SERVICE,
//     useClass: NodemailerService,
//   },
//   {
//     provide: OtpService,
//     useClass: OtpGenerator,
//   },
//   {
//     provide: AuthCachedUserRepository,
//     useClass: RedisAuthCachedUserRepository,
//   },
//   {
//     provide: FileLogger,
//     useClass: FileLogger,
//   },
//   {
//     provide: IdGenerator,
//     useClass: CryptoIdGenerator,
//   },
// ];
