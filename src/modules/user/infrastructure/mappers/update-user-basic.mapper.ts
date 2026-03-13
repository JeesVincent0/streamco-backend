import { UpdateUserBasicInput } from '../../application/inputs/update-user';

export class UpdateUserBasicMapper {
  static toPersistence(input: UpdateUserBasicInput) {
    return {
      userId: input.userId,
      displayName: input.displayName,
      bio: input.bio || undefined,
      dob: input.dob,
      gender: input.gender,
    };
  }
}
