import { UpdateUserBasicInput } from '../../application/inputs/update-user';
import { IUpdateUserBasicRepo } from '../../application/ports/repository/';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas';
import { UpdateUserBasicMapper } from '../mappers';
import { InjectModel } from '@nestjs/mongoose';

/*
 * Implementation of the UpdateUserBasicPort using MongoDB.
 * This class is responsible for updating basic user information in the database.
 */

export class UpdateUserBasicImplMonogoRepository implements IUpdateUserBasicRepo {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<UserDocument>,
  ) {}
  async execute(input: UpdateUserBasicInput): Promise<void> {
    const updateData = UpdateUserBasicMapper.toPersistence(input);
    await this._userModel
      .updateOne(
        { id: input.userId },
        { $set: { ...updateData } },
        { strict: false },
      )
      .exec();
  }
}
