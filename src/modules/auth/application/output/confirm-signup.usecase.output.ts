import { UserRole } from '@/modules/user/domain';

export interface SigninUseCaseOutPut {
  accessToken: string;
  refreshToken: string;
  responseData: {
    user: {
      id: string;
      displayName: string;
      email: string;
      avatarUrl?: string;
    };
    role: UserRole;
  };
}
