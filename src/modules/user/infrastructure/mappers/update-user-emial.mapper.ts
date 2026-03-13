import { UpdateUserEmailInput } from '../../application/inputs/update-user';

export class UpdateUserEmailMapper {
  static toPersistence(input: UpdateUserEmailInput) {
    return {
      email: input.newEmail,
    };
  }
}
