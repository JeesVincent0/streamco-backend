import { UniqueIdService } from '@/shared/domain';
import { UserRole, UserStatus } from '../enums';
import { AdvertiserRestoreProps } from '../types/advertiser.restore';
import { CreateAdvertiserProps } from '../types/create-advertiser.type';
import { Email, HashedPassword } from '../value-objects';
import { BaseUser } from './base-user.entity';

export class Advertiser extends BaseUser {
  private _companyName?: string;
  private constructor(
    id: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: Email,
    role: UserRole,
    status: UserStatus,
    isVerified: boolean,
    isProfileCompleted: boolean,
    createdAt: Date,

    googleId?: string,
    password?: HashedPassword,
    companyName?: string,
    avatarUrl?: string,
  ) {
    super(
      id,
      firstName,
      lastName,
      displayName,
      email,
      role,
      status,
      isVerified,
      isProfileCompleted,
      createdAt,
      googleId,
      password,
      avatarUrl,
    );

    this._companyName = companyName;
  }

  get companyName(): string | undefined {
    return this._companyName;
  }

  changeCompanyName(name: string): void {
    this._companyName = name;
  }

  static create(props: CreateAdvertiserProps) {
    const id = UniqueIdService.generate();
    const displayName = `${props.firstName} ${props.lastName}`;
    return new Advertiser(
      id,
      props.firstName,
      props.lastName,
      displayName,
      props.email,
      UserRole.ADVERTISER,
      UserStatus.ACTIVE,
      props.isVerified || false,
      props.isProfileCompleted,
      new Date(),
      props.googleId,
      props.password,
      props.companyName,
    );
  }

  static restore(props: AdvertiserRestoreProps) {
    return new Advertiser(
      props.id,
      props.firstName,
      props.lastName,
      props.displayName,
      Email.restore(props.email),
      props.role,
      props.status,
      props.isVerified,
      props.isProfileCompleted,
      props.createdAt,
      props.googleId,
      HashedPassword.restore(props.password),
      props.companyName,
    );
  }
}
