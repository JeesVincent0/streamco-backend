import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/ports';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas/base-user.schema';
import { Email } from '@/modules/user/domain/value-objects';
import { BaseUser } from '../../domain/entity';
import { BaseUserMapper } from '../mappers/base-user.mapper';

@Injectable()
export class MongoRepository extends UserRepository {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<BaseUserDocument>,
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

  // async save(user: User): Promise<void> {
  //   await this._userModel.create(user);
  // }
}
