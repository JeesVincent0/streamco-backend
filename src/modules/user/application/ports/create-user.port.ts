import { CreateUserInput } from '../inputs';

export interface CreateUser {
  execute(userData: CreateUserInput): Promise<{ id: string; email: string }>;
}
