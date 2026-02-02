import { UserRole } from '@/modules/user/domain/enums';

export interface LoginInputDto {
  role: UserRole;
  email: string;
  password: string;
}
