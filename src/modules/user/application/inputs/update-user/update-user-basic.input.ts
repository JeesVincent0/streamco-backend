import { UserGender } from '@/modules/user/domain';

export type UpdateUserBasicInput = {
  userId: string;
  displayName: string;
  bio?: string;
  gender?: UserGender;
  dob?: string;
  companyName?: string;
};
