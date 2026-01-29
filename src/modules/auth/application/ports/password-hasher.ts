import { HashedPassword, Password } from '@/shared/domain/value-objects';

export abstract class PasswordHasher {
  abstract hash(password: Password): Promise<HashedPassword>;
  abstract compare(password: Password, hash: string): Promise<boolean>;
}
