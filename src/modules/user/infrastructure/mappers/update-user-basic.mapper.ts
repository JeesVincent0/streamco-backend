import { UpdateUserBasicInput } from '../../application/inputs/update-user';

export class UpdateUserBasicMapper {
  static toPersistence(input: UpdateUserBasicInput) {
    return {
      displayName: input.displayName,
      bio: input.bio || undefined,
      dateOfBirth: new Date(input.dob),
      gender: input.gender,
    };
  }
}
