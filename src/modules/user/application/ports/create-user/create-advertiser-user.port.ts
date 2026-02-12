import { Email } from '@/modules/user/domain/value-objects';
import { CreateAdvertiserUserInput } from '../../inputs';

export interface CreateAdvertiserUser {
  execute(
    input: CreateAdvertiserUserInput,
  ): Promise<{ id: string; email: Email }>;
}
