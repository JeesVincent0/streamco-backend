import { GetAllUsersDto } from '@/shared/dto';
import { BaseUser } from '../../domain';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUserQuery } from '../../application';

export class GetAllUsersRepository implements IUserQuery {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<BaseUser>,
  ) {}

  async getUsers(query: GetAllUsersDto): Promise<{
    users: BaseUser[];
    pagination: { page: number; limit: number; totalPages: number };
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      role,
      isVerified,
      status,
      search,
    } = query;

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {
      ...(role && { role }),
      ...(status && { status }),
      ...(isVerified !== undefined && { isVerified }),
    };

    // Search logic
    if (search) {
      filter.$or = [
        { displayName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: order === 'desc' ? -1 : 1,
    };

    const users = await this._userModel
      .find(filter as Parameters<typeof this._userModel.find>[0])
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await this._userModel.countDocuments(
      filter as Parameters<typeof this._userModel.find>[0],
    );
    return {
      users,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
