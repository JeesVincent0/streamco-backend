import { UserRole } from '@/modules/user/domain/enums';

export interface LoginInput {
  role: UserRole;
  email: string;
  password: string;
}
