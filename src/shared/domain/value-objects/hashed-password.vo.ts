export class HashedPassword {
  private readonly _value: string;

  private constructor(hash: string) {
    this._value = hash;
  }

  static create(hash: string): HashedPassword {
    if (!hash) {
      throw new Error('Hashed password is required');
    }

    return new HashedPassword(hash);
  }

  getValue(): string {
    return this._value;
  }
}
