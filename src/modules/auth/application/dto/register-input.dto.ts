import { UserGender } from '@/shared/domain/enums';

export interface RegisterInputDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  gender: UserGender;
}
