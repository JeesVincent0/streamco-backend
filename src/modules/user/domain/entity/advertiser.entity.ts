import { UserRole, UserStatus } from '../enums';
import { AdvertiserRestoreProps } from '../types/advertiser.restore';
import { CreateAdvertiserProps } from '../types/create-advertiser.type';
import { Email, HashedPassword } from '../value-objects';
import { BaseUser } from './base-user.entity';
import crypto from 'crypto';

export class Advertiser extends BaseUser {
  private _companyName: string;
  private constructor(
    id: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: Email,
    password: HashedPassword,
    role: UserRole,
    status: UserStatus,
    isVerified: boolean,
    companyName: string,
    createdAt: Date,

    avatarUrl?: string,
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
      isVerified,
      createdAt,
      avatarUrl,
    );

    this._companyName = companyName;
  }

  get companyName(): string {
    return this._companyName;
  }

  changeCompanyName(name: string): void {
    this._companyName = name;
  }

  static create(props: CreateAdvertiserProps) {
    const id = crypto.randomUUID();
    const displayName = `${props.firstName} ${props.lastName}`;
    return new Advertiser(
      id,
      props.firstName,
      props.lastName,
      displayName,
      props.email,
      props.password,
      UserRole.ADVERTISER,
      UserStatus.ACTIVE,
      false,
      props.companyName,
      new Date(),
    );
  }

  static restore(props: AdvertiserRestoreProps) {
    return new Advertiser(
      props.id,
      props.firstName,
      props.lastName,
      props.displayName,
      Email.restore(props.email),
      HashedPassword.restore(props.password),
      props.role,
      props.status,
      props.isVerified,
      props.companyName,
      props.createdAt,
    );
  }
}
