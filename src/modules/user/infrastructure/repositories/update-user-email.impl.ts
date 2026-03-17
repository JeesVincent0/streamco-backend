import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserEmailPort } from '../../application';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas';
import { UpdateUserEmailInput } from '../../application/inputs/update-user';
import { UpdateUserEmailMapper } from '../mappers/update-user-emial.mapper';

export class UpdateUserEmailImplMonogoRepository implements UpdateUserEmailPort {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<BaseUserDocument>,
  ) {}
  async execute(input: UpdateUserEmailInput): Promise<void> {
    const email = UpdateUserEmailMapper.toPersistence(input);
    await this._userModel.updateOne({ id: input.userId }, { $set: email });
  }
}
