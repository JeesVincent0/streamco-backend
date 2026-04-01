import { UserRole } from '@/modules/user/domain';

export interface ResetPasswordUseCaseOutPut {
  status: string;
  message: string;
  data: {
    role: UserRole;
  };
}
