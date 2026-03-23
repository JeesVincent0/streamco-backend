export const OTP_SERVICE_TOKEN = Symbol('IOtpService');
export const MAIL_SERVICE_PORT_TOKEN = Symbol('IMailService');
export const PASSWORD_HASHER_PORT_TOKEN = Symbol('IPasswordHasher');
export const RESEND_OTP_USE_CASE_TOKEN = Symbol('IResendOtpUseCase');
export const VERIFY_OTP_USE_CASE_TOKEN = Symbol('IVerifyOtpUseCase');
export const GENERATE_OTP_USE_CASE_TOKEN = Symbol('IGenerateOtpUseCase');
export const RESET_PASSWORD_USE_CASE_TOKEN = Symbol('IResetPasswordUseCase');
export const AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN = Symbol('ICacheBaseRepo');
export const VERIFY_RESET_PASSWORD_OTP_USE_CASE_TOKEN = Symbol(
  'IVerifyResetPasswordOtpUseCase',
);

export const TOKEN_BLACK_LIST_CACHE = Symbol('TOKEN_BLACK_LIST_CACHE');
export const REFRESH_TOKEN_REPOSITORY_PORT = Symbol('REFRESH_TOKEN_REPOSITORY');
