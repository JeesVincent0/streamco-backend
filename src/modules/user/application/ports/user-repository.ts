import { User } from '@/modules/user/domain/entity';
import { Email } from '@/shared/domain/value-objects';

export interface UserRepository {
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
}
