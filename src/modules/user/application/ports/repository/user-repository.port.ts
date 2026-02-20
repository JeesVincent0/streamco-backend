import { Email } from '@/modules/user/domain';
import { BaseUser } from '@/modules/user/domain/entity';

export interface UserRepositoryPort {
  findById(id: string): Promise<BaseUser | null>;
  findByEmail(email: Email): Promise<BaseUser | null>;
  save(user): Promise<void>;
}
