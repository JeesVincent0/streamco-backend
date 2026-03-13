import { Inject } from '@nestjs/common';
import { UpdateUserBasicInput } from '../../application/inputs/update-user';
import { UpdateUserBasicPort } from '../../application/ports/repository/update-user-basic.port';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas';
import { UpdateUserBasicMapper } from '../mappers';

/*
 * Implementation of the UpdateUserBasicPort using MongoDB.
 * This class is responsible for updating basic user information in the database.
 */

export class UpdateUserBasicImplMonogoRepository implements UpdateUserBasicPort {
  constructor(
    @Inject('UpdateUserBasicPort')
    private readonly _userModel: Model<UserDocument>,
  ) {}
  async execute(input: UpdateUserBasicInput): Promise<void> {
    const updateData = UpdateUserBasicMapper.toPersistence(input);
    await this._userModel.updateOne({ id: input.userId }, { $set: updateData });
  }
}
