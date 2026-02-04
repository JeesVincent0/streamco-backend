import { UserGender, UserRole } from '@/modules/user/domain/enums';

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;

  companyName?: string;
  dob?: string;
  gender?: UserGender;
}
