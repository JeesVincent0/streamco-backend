import { Password } from '@/modules/user/domain/value-objects';
import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../application/ports';

export class BcryptPasswordHasher extends PasswordHasher {
  private readonly _SALT_ROUNDS = 10;

  async hash(password: Password): Promise<string> {
    return bcrypt.hash(password.getValue(), this._SALT_ROUNDS);
  }

  async compare(password: Password, hash: string): Promise<boolean> {
    return bcrypt.compare(password.getValue(), hash);
  }
}
