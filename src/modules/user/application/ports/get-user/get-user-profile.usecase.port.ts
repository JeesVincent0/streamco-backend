import { UserResponse } from '@/shared/types';

export interface IGetUserProfileUseCase {
  execute(input: { id: string; paramsId: string }): Promise<UserResponse>;
}
