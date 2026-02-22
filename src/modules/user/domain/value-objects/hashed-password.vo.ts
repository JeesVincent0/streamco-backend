import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { BadRequestError } from '@/shared/errors';

export class HashedPassword {
  private readonly _value: string;

  private constructor(hash: string) {
    this._value = hash;
  }

  static create(hash: string): HashedPassword {
    if (!hash) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    return new HashedPassword(hash);
  }

  static restore(hash: string): HashedPassword {
    return new HashedPassword(hash);
  }

  getValue(): string {
    return this._value;
  }
}
