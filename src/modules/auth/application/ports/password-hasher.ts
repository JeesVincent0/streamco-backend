import { Password } from '@/shared/domain/value-objects';

export interface PasswordHasher {
  hash(password: Password): Promise<string>;
  compare(password: Password, hash: string): Promise<boolean>;
}
