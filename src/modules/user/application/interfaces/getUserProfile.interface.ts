import { UserResponse } from '@/shared/types';

export interface GetUserProfileInterface {
  execute(input: { id: string }): Promise<UserResponse>;
}
