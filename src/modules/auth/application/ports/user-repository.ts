import { User } from '@/modules/user/domain/entity';
import { Email } from '@/shared/domain/value-objects';

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
