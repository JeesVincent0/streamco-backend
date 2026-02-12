import { Password } from '@/modules/user/domain/value-objects';

export abstract class PasswordHasherPort {
  abstract hash(password: Password | string | number): Promise<string>;
  abstract compare(
    password: Password | string | number,
    hash: string,
  ): Promise<boolean>;
}
