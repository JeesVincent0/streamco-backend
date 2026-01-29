export class HashedPassword {
  private readonly value: string;

  private constructor(hash: string) {
    this.value = hash;
  }

  static create(hash: string): HashedPassword {
    if (!hash) {
      throw new Error('Hashed password is required');
    }

    return new HashedPassword(hash);
  }

  getValue(): string {
    return this.value;
  }
}
