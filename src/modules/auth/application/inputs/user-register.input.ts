import { UserRole } from '@/modules/user/domain/enums';

export type RegisterInput =
  | {
      role: UserRole.USER;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      gender: string;
      dob: Date;
    }
  | {
      role: UserRole.ADVERTISER;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      companyName: string;
    };

export type AdvertiserRegisterInput = {
  role: UserRole.ADVERTISER;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
};
