import { Password } from '@/shared/domain/value-objects';

export abstract class PasswordHasher {
  abstract hash(password: Password): Promise<string>;
  abstract compare(password: Password, hash: string): Promise<boolean>;
}
