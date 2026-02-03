import {
  UserContentType,
  UserGender,
  UserRole,
  UserSocialMediaType,
  UserStatus,
} from '@/modules/user/domain/enums';

import { BaseUser } from '@/modules/user/domain/entity/base-user.entity';
import {
  Email,
  HashedPassword,
  SocialLink,
} from '@/modules/user/domain/value-objects';
import { CreateUserProps } from '../types';
import { UserRestoreProps } from '../types';
import { BadRequestError } from '@/shared/errors';

/**
 * User
 * ------
 * Concrete user aggregate root.
 * Encapsulates profile-related behavior.
 */
export class User extends BaseUser {
  private dateOfBirth: Date;
  private gender: UserGender;
  private bio?: string;
  private location?: string;
  private socialLinks: SocialLink[] = [];
  private contentType: UserContentType;

  private constructor(
    id: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: Email,
    password: HashedPassword,
    gender: UserGender,
    dateOfBirth: Date,
    contentType: UserContentType,
    role: UserRole,
    status: UserStatus,
    createdAt: Date,

    avatarUrl?: string,
    bio?: string,
    location?: string,
    socialLinks: SocialLink[] = [],
  ) {
    super(
      id,
      firstName,
      lastName,
      displayName,
      email,
      password,
      role,
      status,
      createdAt,
      avatarUrl,
    );

    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.bio = bio;
    this.location = location;
    this.socialLinks = socialLinks;
    this.contentType = contentType;
  }

  /* ==================== Getters ==================== */

  getDateOfBirth(): Date | undefined {
    return this.dateOfBirth;
  }

  getGender(): UserGender | undefined {
    return this.gender;
  }

  getBio(): string | undefined {
    return this.bio;
  }

  getLocation(): string | undefined {
    return this.location;
  }

  getContentType(): UserContentType {
    return this.contentType;
  }

  getSocialLinks(): SocialLink[] {
    return [...this.socialLinks];
  }

  /* ==================== Domain rules ==================== */

  /**
   * User must be at least 12 years old.
   */
  private isAtLeast12YearsOld(dob: Date): boolean {
    const today = new Date();

    const cutoff = new Date(
      today.getFullYear() - 12,
      today.getMonth(),
      today.getDate(),
    );

    return dob <= cutoff;
  }

  /* ==================== Mutations ==================== */

  changeDateOfBirth(dateOfBirth: Date): void {
    this.ensureNotDeleted();

    if (dateOfBirth > new Date()) {
      throw new BadRequestError('Date of birth cannot be in the future');
    }

    if (!this.isAtLeast12YearsOld(dateOfBirth)) {
      throw new BadRequestError('User must be at least 12 years old');
    }

    this.dateOfBirth = new Date(dateOfBirth);
    this.touch();
  }

  changeGender(gender: UserGender): void {
    this.ensureNotDeleted();
    this.gender = gender;
    this.touch();
  }

  changeBio(bio: string): void {
    this.ensureNotDeleted();

    if (bio.length > 500) {
      throw new BadRequestError('Bio must not exceed 500 characters');
    }

    this.bio = bio;
    this.touch();
  }

  changeLocation(location: string): void {
    this.ensureNotDeleted();

    if (location.length > 100) {
      throw new BadRequestError('Location must not exceed 100 characters');
    }

    this.location = location;
    this.touch();
  }

  changeContentType(contentType: UserContentType): void {
    this.ensureNotDeleted();
    this.contentType = contentType;
    this.touch();
  }

  /* ==================== Social Links ==================== */

  addSocialLink(link: SocialLink): void {
    this.ensureNotDeleted();

    const exists = this.socialLinks.some((l) => l.getType() === link.getType());

    if (exists) {
      throw new BadRequestError(`${link.getType()} already exists`);
    }

    this.socialLinks.push(link);
    this.touch();
  }

  updateSocialLink(type: UserSocialMediaType, url: string): void {
    this.ensureNotDeleted();

    const index = this.socialLinks.findIndex((l) => l.getType() === type);

    if (index === -1) {
      throw new BadRequestError(`Social link ${type} not found`);
    }

    this.socialLinks[index] = SocialLink.create(type, url);
    this.touch();
  }

  removeSocialLink(type: UserSocialMediaType): void {
    this.ensureNotDeleted();

    const initialLength = this.socialLinks.length;

    this.socialLinks = this.socialLinks.filter((l) => l.getType() !== type);

    if (this.socialLinks.length === initialLength) {
      throw new BadRequestError(`Social link ${type} not found`);
    }

    this.touch();
  }

  static create(props: CreateUserProps): User {
    const displayName = `${props.firstName} ${props.lastName}`;
    return new User(
      props.id,
      props.firstName,
      props.lastName,
      displayName,
      props.email,
      props.password,
      props.gender,
      props.dob,
      UserContentType.SAFE_MODE,
      UserRole.USER,
      UserStatus.ACTIVE,
      new Date(),
    );
  }

  static restore(props: UserRestoreProps) {
    return new User(
      props.id,
      props.firstName,
      props.lastName,
      props.displayName,
      Email.restore(props.email),
      HashedPassword.restore(props.password),
      props.gender,
      props.dateOfBirth,
      props.contentType,
      props.role,
      props.status,
      props.createdAt,
      props.avatarUrl,
      props.bio,
      props.location,
      props.socialLinks.map((link) => SocialLink.restore(link.type, link.url)),
    );
  }
}
