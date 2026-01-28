export class Password {
  private readonly _value: string;

  private constructor(password: string) {
    this._value = password;
  }

  static create(password: string): Password {
    if (!password) throw new Error('Password is required');

    if (!Password.isStrong(password))
      throw new Error('Password is not strong enough');

    return new Password(password);
  }

  private static isStrong(passwrod: string): boolean {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return PASSWORD_REGEX.test(passwrod);
  }
}
