import { GetAllUsersInput } from '../../inputs';
import { GetAllUsersOutput } from '../../output/get-all-users.output';

export interface IGetAllUsersUseCase {
  execute(input: GetAllUsersInput): Promise<{
    status: string;
    message: string;
    data: {
      users: GetAllUsersOutput[];
      pagination: { page: number; limit: number; totalPages: number };
    };
  }>;
}
