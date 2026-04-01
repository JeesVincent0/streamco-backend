import { Password } from '@/modules/user/domain/value-objects';

export interface IPasswordHasher {
  hash(password: Password | string | number): Promise<string>;
  compare(password: Password | string | number, hash: string): Promise<boolean>;
}
