import { UserResponse } from '@/shared/types';

export interface IGetUserProfileUseCase {
  execute(input: { id: string }): Promise<UserResponse>;
}
