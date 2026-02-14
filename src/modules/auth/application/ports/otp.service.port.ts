export const OTP_SERVICE = Symbol('OTP_SERVICE');

export interface OtpServicePort {
  generate(): number;
}
