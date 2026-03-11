import { Email } from '@/modules/user/domain';
import { Advertiser, BaseUser, User } from '@/modules/user/domain/entity';

export interface UserRepositoryPort {
  findById(id: string): Promise<BaseUser | null | User | Advertiser>;
  findByEmail(email: Email): Promise<BaseUser | null>;
  save(user): Promise<void>;
}
