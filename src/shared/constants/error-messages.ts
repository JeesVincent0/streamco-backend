export const ERROR_MESSAGES = {
  // FOR CHANNEL MODULE
  CHANNEL_NOT_EXISTS: 'Channel not exists',
  WRONG_STATUS: 'Wrong channel status entered',
  PERMISSION_DENIED: 'Permission denied',

  USE_ANOTHER_CHANNEL_ID: 'Use another channel ID',
  CATEGORY_NOT_FOUND: 'Category not found',
  USE_ANOTHER_SLUG: 'User another slug',
  USE_ANOTHER_EMAIL_ID: 'Use another email ID',
  UNSUPPORTED_USER_TYPE: 'Unsupported user type',
  YOUR_ACCOUNT_SUSPENDED: 'Your account is suspended.',
  // Token error messages
  INVALID_TOKEN: 'Invalid token',
  MISSING_TOKEN: 'Missing Token',

  // OTP verification error messages
  TOO_MANY_ATTEM: 'Too many attempts, try again after sometimes',
  PLEASE_TRY_AGAIN: 'Please try again',
  INVALID_OTP_PURPOSE: 'In valid otp purpose',
  OTP_EXPIRED: 'OTP has expired',

  // user signup/signin error messeges
  AGE_MUST_BE_12: 'Age must be at least 12 years old',
  USER_ALREADY_EXIST: 'User already exit',
  USER_NOT_FOUND: 'User does not exist',
  INVALID_PASSWORD: 'Invalid password',
  PASSWORD_NOT_MATCHING: 'Password not matching',
  USER_NOT_VERIFIED: 'User not verified',

  SESSION_EXPIRED: 'Session expired',
  INCORRECT_CREDENTIALS: 'Incorrect creadentials',
  ENV_FILE_NOT_ATTACHED: 'Env file not attached',

  SOMETHING_WENT_WRONG: 'Something went wrong, try again after some times',
} as const;
