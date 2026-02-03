import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { UserRole } from '@/modules/user/domain/enums';
import { UserStatus } from '@/modules/user/domain/enums';
import { BadRequestError } from '@/shared/errors';

/**
 * BaseUser
 * ----------
 * Abstract root entity for all user types.
 * Contains shared identity, lifecycle, and security behavior.
 */
export abstract class BaseUser {
  protected constructor(
    protected readonly id: string,
    protected firstName: string,
    protected lastName: string,
    protected displayName: string,
    protected email: Email,
    protected password: HashedPassword,
    protected role: UserRole,
    protected status: UserStatus,
    protected readonly createdAt: Date,

    protected avatarUrl?: string,
    protected updatedAt?: Date,
    protected deletedAt?: Date,
  ) {}

  /* ==================== Getters ==================== */

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getEmail(): Email {
    return this.email;
  }

  getRole(): UserRole {
    return this.role;
  }

  getStatus(): UserStatus {
    return this.status;
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }

  /* ==================== Protected helpers ==================== */

  /**
   * Updates modification timestamp.
   * Called internally after state changes.
   */
  protected touch(): void {
    this.updatedAt = new Date();
  }

  protected ensureNotDeleted(): void {
    if (this.deletedAt) {
      throw new BadRequestError('User is deleted and cannot be modified');
    }
  }

  /* ==================== Mutations ==================== */

  changeFirstName(name: string): void {
    this.ensureNotDeleted();
    this.firstName = name;
    this.touch();
  }

  changeLastName(name: string): void {
    this.ensureNotDeleted();
    this.lastName = name;
    this.touch();
  }

  changeDisplayName(name: string): void {
    this.ensureNotDeleted();
    this.displayName = name;
    this.touch();
  }

  changeEmail(email: Email): void {
    this.ensureNotDeleted();

    if (this.email.equals(email)) return;

    this.email = email;
    this.touch();
  }

  changePassword(password: HashedPassword): void {
    this.ensureNotDeleted();
    this.password = password;
    this.touch();
  }

  changeAvatarUrl(url: string): void {
    this.ensureNotDeleted();
    this.avatarUrl = url;
    this.touch();
  }

  suspend(): void {
    this.ensureNotDeleted();
    this.status = UserStatus.SUSPENDED;
    this.touch();
  }

  delete(): void {
    if (this.deletedAt) return;

    this.status = UserStatus.DELETED;
    this.deletedAt = new Date();
    this.touch();
  }
}
