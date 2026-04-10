import { BaseUser } from '@/modules/user/domain';

export interface IGetUserProfileUseCase {
  execute(input: { id: string; paramsId: string }): Promise<BaseUser>;
}
