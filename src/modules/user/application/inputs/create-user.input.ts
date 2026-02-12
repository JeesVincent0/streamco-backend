import { UserRole } from '../../domain/enums';

export type CreateUserInput =
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
