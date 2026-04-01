import { UserRepositoryPort } from '../../application/ports';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas/base-user.schema';
import { Email } from '@/modules/user/domain/value-objects';
import { Advertiser, BaseUser, User } from '../../domain/entity';
import { BaseUserMapper } from '../mappers/base-user.mapper';
import { UserRole } from '../../domain/enums';
import { AdvertiserMapper, UserMappers } from '../mappers';
import { BadRequestError } from '@/shared/errors';
import { Inject } from '@nestjs/common';
import { STORAGE_SERVICE_PORT_TOKEN } from '@/shared/infrastructure/storage/token';
import { type IStorageService } from '@/shared/infrastructure/storage/storage-service.port';

export class MongoRepository implements UserRepositoryPort {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<BaseUserDocument>,

    @Inject(STORAGE_SERVICE_PORT_TOKEN)
    private readonly _storageService: IStorageService,
  ) {}

  async findById(id: string): Promise<BaseUser | null | User | Advertiser> {
    const userDoc = await this._userModel.findOne({
      id,
      deletedAt: null,
    });

    if (!userDoc) return null;

    if (
      userDoc.avatarUrl &&
      userDoc.avatarUrl.startsWith(
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
      )
    ) {
      userDoc.avatarUrl = await this._storageService.getSignedViewUrl(
        userDoc.avatarUrl,
      );
    }

    return BaseUserMapper.toDomain(userDoc);
  }

  async findByEmail(
    email: Email,
  ): Promise<BaseUser | null | User | Advertiser> {
    const userDoc = await this._userModel.findOne({
      email: email.getValue(),
      deletedAt: null,
    });

    if (!userDoc) return null;
    if (
      userDoc.avatarUrl &&
      userDoc.avatarUrl.startsWith(
        'https://streamco-avatar-2026.s3.us-east-1.amazonaws.com',
      )
    ) {
      userDoc.avatarUrl = await this._storageService.getSignedViewUrl(
        userDoc.avatarUrl,
      );
    }
    return BaseUserMapper.toDomain(userDoc);
  }

  async save(user: User | Advertiser): Promise<void> {
    let persistence: Record<string, unknown>;

    if (user.role === UserRole.USER) {
      persistence = UserMappers.toPersistence(user as User);
    } else if (user.role === UserRole.ADVERTISER) {
      persistence = AdvertiserMapper.toPersistence(user as Advertiser);
    } else {
      throw new BadRequestError('Unsupported user role');
    }

    const email = String(persistence.email);
    const existingUser = await this._userModel.findOne({
      email,
      deletedAt: null,
    });

    if (!existingUser) {
      await this._userModel.create(persistence);
    } else {
      await this._userModel.updateOne(
        {
          email,
          deletedAt: null,
        },
        {
          $set: persistence,
        },
        { strict: false },
      );
    }
  }
}
