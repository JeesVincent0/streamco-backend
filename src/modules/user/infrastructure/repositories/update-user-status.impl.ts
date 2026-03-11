import { Model } from 'mongoose';
import { UpdateUserStatusPort } from '../../application';
import { UserDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';

/*
 * Implementation of the UpdateUserStatusPort using MongoDB.
 */

export class UpdateUserStatusMongoRepository implements UpdateUserStatusPort {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async execute(userId: string, newStatus: string): Promise<void> {
    await this.userModel
      .updateOne({ id: userId }, { status: newStatus })
      .exec();
  }
}
