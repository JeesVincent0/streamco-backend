import { ICheckUserExists } from '../../application';
import { Email } from '../../domain';
import { Model } from 'mongoose';
import { BaseUserDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';

export class CheckUserExistsImplMongoRepository implements ICheckUserExists {
  constructor(
    @InjectModel('User') private readonly _userRepo: Model<BaseUserDocument>,
  ) {}
  async execute(email: Email, excludeUserId: string): Promise<boolean> {
    const filter = {
      email: email.getValue(),
      id: { $ne: excludeUserId },
    };

    const user = await this._userRepo.exists(filter);
    return !!user;
  }
}
