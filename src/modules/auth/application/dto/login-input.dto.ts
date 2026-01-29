import { UserRole } from '@/shared/domain/enums';

export interface LoginInputDto {
  role: UserRole;
  email: string;
  password: string;
}
