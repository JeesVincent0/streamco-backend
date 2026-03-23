import { UserRole } from '@/modules/user/domain';

export interface GoogleAuthUseCaseOutPut {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
  name: string;
}
