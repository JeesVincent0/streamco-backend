import { UserRepository } from '../../application/ports';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas/base-user.schema';
import { Email } from '@/modules/user/domain/value-objects';
import { Advertiser, BaseUser, User } from '../../domain/entity';
import { BaseUserMapper } from '../mappers/base-user.mapper';
import { FileLogger } from '@/shared/logger/file-logger';
import { UserRole } from '../../domain/enums';
import { AdvertiserMapper, UserMappers } from '../mappers';
import { BadRequestError } from '@/shared/errors';

export class MongoRepository extends UserRepository {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<BaseUserDocument>,
    private readonly _logger: FileLogger,
  ) {
    super();
  }

  async findByEmail(email: Email): Promise<BaseUser | null> {
    const userDoc = await this._userModel.findOne({
      email: email.getValue(),
      deletedAt: null,
    });

    if (!userDoc) return null;

    return BaseUserMapper.toDomain(userDoc);
  }

  async save(user: User | Advertiser): Promise<void> {
    let persistence: Record<string, unknown>;

    if (user.getRole() === UserRole.USER) {
      persistence = UserMappers.toPersistence(user as User);
    } else if (user.getRole() === UserRole.ADVERTISER) {
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
        {
          upsert: true,
        },
      );
    }
  }
}
