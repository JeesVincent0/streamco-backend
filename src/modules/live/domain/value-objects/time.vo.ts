import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class Time {
  private value: string;

  private constructor(time: string) {
    this.value = time;
  }

  static create(time: string): Time {
    if (!Time.isValid(time)) {
      throw new Error(ERROR_MESSAGES.INVALID_TIME_FORMAT);
    }
    return new Time(time);
  }

  static isValid(time: string): boolean {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  }

  getValue(): string {
    return this.value;
  }
}
