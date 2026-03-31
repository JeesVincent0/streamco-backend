import { BadRequestError } from '@/shared/errors';

export class Email {
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email;
  }

  static create(email: string): Email {
    console.log('this is email vo: ', email);
    if (!email) throw new BadRequestError('Email is required');

    const normalizedEmail = email.trim().toLowerCase();

    if (!Email.isValid(normalizedEmail))
      throw new BadRequestError('Invallid email fromat');

    return new Email(normalizedEmail);
  }

  static restore(email: string): Email {
    return new Email(email);
  }

  private static isValid(email: string): boolean {
    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return EMAIL_REGEX.test(email);
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  getValue(): string {
    return this._value;
  }
}
