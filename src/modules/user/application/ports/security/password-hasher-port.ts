import { Password } from '@/modules/user/domain';

export interface PasswordHasherPort {
  hash(password: Password): Promise<string>;
  compare(password: Password, hash: string): Promise<boolean>;
}
