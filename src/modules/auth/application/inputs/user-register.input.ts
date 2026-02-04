import { UserGender } from '@/modules/user/domain/enums';

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  gender: UserGender;
}
