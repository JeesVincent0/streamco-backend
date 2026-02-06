import { UserRole, UserStatus } from '../enums';
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
      false,
      createdAt,
      avatarUrl,
    );

    this._companyName = companyName;
  }

  getCompanyName(): string {
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
      props.role,
      UserStatus.ACTIVE,
      props.companyName,
      new Date(),
    );
  }
}
