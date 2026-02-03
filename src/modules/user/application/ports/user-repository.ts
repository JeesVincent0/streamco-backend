import { BaseUser } from '../../domain/entity';
import { Email } from '../../domain/value-objects/email.vo';

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<BaseUser | null>;
  abstract save(user): Promise<void>;
}
