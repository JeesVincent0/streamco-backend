import { Password } from '@/modules/user/domain';

export interface passwordHasherPort {
  hash(password: Password | string | number): Promise<string>;
  compare(password: Password | string | number, hash: string): Promise<boolean>;
}
