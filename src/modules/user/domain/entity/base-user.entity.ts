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
    protected readonly _id: string,
    protected _firstName: string,
    protected _lastName: string,
    protected _displayName: string,
    protected _email: Email,
    protected _password: HashedPassword,
    protected _role: UserRole,
    protected _status: UserStatus,
    protected _isVerified: boolean,
    protected readonly _createdAt: Date,

    protected _avatarUrl?: string,
    protected _updatedAt?: Date,
    protected _deletedAt?: Date,
  ) {}

  /* ==================== Getters ==================== */

  get isVerified(): boolean {
    return this._isVerified;
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get displayName(): string {
    return this._displayName;
  }

  get email(): Email {
    return this._email;
  }

  get password(): HashedPassword {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  get status(): UserStatus {
    return this._status;
  }

  get avatarUrl(): string | undefined {
    return this._avatarUrl;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  /* ==================== Protected helpers ==================== */

  /**
   * Updates modification timestamp.
   * Called internally after state changes.
   */
  protected touch(): void {
    this._updatedAt = new Date();
  }

  protected ensureNotDeleted(): void {
    if (this._deletedAt) {
      throw new BadRequestError('User is deleted and cannot be modified');
    }
  }

  /* ==================== Mutations ==================== */

  verify(): void {
    this.ensureNotDeleted();
    this._isVerified = true;
    this.touch();
  }

  changeFirstName(name: string): void {
    this.ensureNotDeleted();
    this._firstName = name;
    this.touch();
  }

  changeLastName(name: string): void {
    this.ensureNotDeleted();
    this._lastName = name;
    this.touch();
  }

  changeDisplayName(name: string): void {
    this.ensureNotDeleted();
    this._displayName = name;
    this.touch();
  }

  changeEmail(email: Email): void {
    this.ensureNotDeleted();

    if (this._email.equals(email)) return;

    this._email = email;
    this.touch();
  }

  changePassword(password: HashedPassword): void {
    this.ensureNotDeleted();
    this._password = password;
    this.touch();
  }

  changeAvatarUrl(url: string): void {
    this.ensureNotDeleted();
    this._avatarUrl = url;
    this.touch();
  }

  suspend(): void {
    this.ensureNotDeleted();
    this._status = UserStatus.SUSPENDED;
    this.touch();
  }

  delete(): void {
    if (this._deletedAt) return;

    this._status = UserStatus.DELETED;
    this._deletedAt = new Date();
    this.touch();
  }
}
