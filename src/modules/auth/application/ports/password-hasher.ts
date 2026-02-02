import { Password } from '@/modules/user/domain/value-objects';

export abstract class PasswordHasher {
  abstract hash(password: Password): Promise<string>;
  abstract compare(password: Password, hash: string): Promise<boolean>;
}
