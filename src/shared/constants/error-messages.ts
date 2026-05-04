export const ERROR_MESSAGES = {
  // COMMON ERROS
  ACCESS_DENIED: 'Access denied',

  // FOR LIVES
  LIVE_IS_CANCELLED: 'Live is cancelled',
  SCHEDULED_LIVE_NOT_FOUND: 'Scheduled live not found',
  TIME_SLOT_ALREADY_BOOKED: 'Time slot already booked',
  INVALID_TIME_FORMAT: 'Invalid time format. Use HH:MM',
  INVALID_DURATION_FORMAT: 'Invalid duration format. Use HH:MM',
  SCHEDULED_TIME_MUST_BE_IN_THE_FUTURE: 'Scheduled time must be in the future',

  // FOR CHANNEL MODULE
  CHANNEL_BLOCKED: 'Channel blocked',
  PERMISSION_DENIED: 'Permission denied',
  CHANNEL_NOT_EXISTS: 'Channel not exists',
  WRONG_STATUS: 'Wrong channel status entered',

  // FOR USER
  USER_NOT_EXISTS: 'User not exits',
  USER_SUSPENDED: 'User suspended',

  // FOR CATEGORY
  CATEGORY_NOT_FOUND: 'Category not found',
  SELECTED_CATEGORY_BLOCKED: 'Selected category is blocked choose another one',

  USE_ANOTHER_CHANNEL_ID: 'Use another channel ID',
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
