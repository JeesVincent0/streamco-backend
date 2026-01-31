import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/ports';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas/base-user.schema';
import { Email } from '@/shared/domain/value-objects';
import { User } from '../../domain/entity';

@Injectable()
export class MongoRepository implements UserRepository {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<BaseUserDocument>,
  ) {}

  async findByEmail(email: Email): Promise<User | null> {
    const userDoc = await this._userModel.findOne({
      email: email.getValue(),
      deletedAt: null,
    });

    if (!userDoc) return null;


  }
}
