export class OtpTimer {
  static Get(expiredAt: string | Date): number {
    const now = Date.now();
    const expiry = new Date(expiredAt).getTime();
    const remainingTime = Math.max(0, Math.floor((expiry - now) / 1000));
    return remainingTime;
  }
}
