import { Advertiser, BaseUser, User } from '@/modules/user/domain';

export interface IGetBaseUserUseCase {
  execute(input: { id: string }): Promise<User | BaseUser | Advertiser>;
}
