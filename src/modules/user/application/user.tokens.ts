// user create tokens
export const CREATE_USER_USE_CASE_TOKEN = Symbol('ICreateUserUseCase');
export const CREATE_ADVERTISER_USE_CASE_TOKEN = Symbol(
  'ICreateAdvertiserUseCase',
);
export const CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN = Symbol(
  'ICreateUserWithGoogleAuthUseCase',
);

// user get tokens
export const GET_ALL_USERS_QUERY_IMPL_TOKEN = Symbol('IUserQuery');
export const GET_ALL_USERS_USE_CASE_TOKEN = Symbol('IGetAllUsersUseCase');
export const GET_BASE_USER_USE_CASE_TOKEN = Symbol('IGetBaseUserUseCase');
export const GET_USER_PROFILE_USE_CASE_TOKEN = Symbol('IGetUserProfileUseCase');

// user update tokens
export const UPDATE_USER_STATUS_USE_CASE_TOKEN = Symbol(
  'IUpdateUserStatusUseCase',
);
export const UPDATE_USER_EMAIL_USE_CASE_TOKEN = Symbol(
  'IUpdateUserEmailUseCase',
);
export const UPDATE_USER_BASIC_USE_CASE_TOKEN = Symbol(
  'IUpdateUserBasicUseCase',
);
export const UPDATE_USER_AVATAR_URL_USE_CASE_TOKEN = Symbol(
  'IUpdateUserAvatarUlrUsecase',
);

export const UPDATE_USER_SOCIAL_LINKS_USE_CASE_TOKEN = Symbol(
  'IUpdateUserSocialLinksUseCase',
);

export const VERIFY_OTP_EMAIL_UPDATE_USE_CASE_TOKEN = Symbol(
  'IVerifyOtpEmailUpdateUseCase',
);

export const CHECK_USER_EXISTS_REPO_TOKEN = Symbol('ICheckUserExits');
export const UPDATE_USER_BASIC_REPO_TOKEN = Symbol('IUpdateUserBasicRepo');
