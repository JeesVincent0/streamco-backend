export const OTP_SERVICE = Symbol('OTP_SERVICE');

export abstract class OtpService {
  abstract generate(): number;
}
