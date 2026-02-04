import { UserRole } from '@/modules/user/domain/enums';

export type CachedUser =
  | {
      role: UserRole.USER;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      otp: number;
      gender: string;
      dob: Date;
    }
  | {
      role: UserRole.ADMIN;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      otp: number;
      companyName: string;
    };
