import { UserStatus } from '../../domain';
import { UserRepositoryPort } from '../../application';
import { IUserCheck } from '@/shared/application/ports';

export class UserCheckAdapter implements IUserCheck {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async isUserActive(userId: string): Promise<boolean> {
    const user = await this._userRepo.findById(userId);

    if (!user) return false;

    if (user.status !== UserStatus.ACTIVE) return false;

    return true;
  }
}
