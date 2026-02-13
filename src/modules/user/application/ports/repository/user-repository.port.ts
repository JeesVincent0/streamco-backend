import { Email } from '@/modules/user/domain';
import { BaseUser } from '@/modules/user/domain/entity';

export abstract class UserRepositoryPort {
  abstract findByEmail(email: Email): Promise<BaseUser | null>;
  abstract save(user): Promise<void>;
}
