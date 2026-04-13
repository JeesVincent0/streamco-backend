import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class Duration {
  private _value: string;

  private constructor(duration: string) {
    this._value = duration;
  }

  static create(duration: string): Duration {
    if (!Duration.isValid(duration)) {
      throw new Error(ERROR_MESSAGES.INVALID_DURATION_FORMAT);
    }
    return new Duration(duration);
  }

  static isValid(duration: string): boolean {
    const regex = /^([0-9]\d):([0-5]\d)$/; // 00:00 to 99:59
    return regex.test(duration);
  }

  toMinutes(): number {
    const [hours, minutes] = this._value.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getValue(): string {
    return this._value;
  }
}
