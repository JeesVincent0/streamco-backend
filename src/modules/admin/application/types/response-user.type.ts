import { UserContentType, UserGender, UserRole } from '@/modules/user/domain';

export type UserResponse =
  | {
      id: string;
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
      role: UserRole.USER;
      status: string;
      isVerified: boolean;
      isProfileCompleted: boolean;
      createdAt: Date;
      dob: Date | null;
      location: string | null;
      socialLinks: { type: string; url: string }[];
      avatarUrl: string | null;
      contentType: UserContentType;
      gender?: UserGender | null;
      bio?: string | null;
    }
  | {
      id: string;
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
      role: UserRole.ADVERTISER;
      status: string;
      isVerified: boolean;
      isProfileCompleted: boolean;
      companyName: string | null | undefined;
      createdAt: Date;
      avatarUrl: string | null;
    };
