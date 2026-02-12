import { Email } from '@/modules/user/domain/value-objects';
import { CreateNormalUserInput } from '../../inputs/create-user/create-normal-user.input';

export interface CreateAdvertiserUser {
  execute(input: CreateNormalUserInput): Promise<{ id: string; email: Email }>;
}
