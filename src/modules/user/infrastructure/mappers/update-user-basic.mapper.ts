import { UpdateUserBasicInput } from '../../application/inputs/update-user';

export class UpdateUserBasicMapper {
  static toPersistence(input: UpdateUserBasicInput) {
    return {
      displayName: input.displayName,
      bio: input.bio || undefined,
      dateOfBirth: input.dob ? new Date(input.dob) : undefined,
      gender: input.gender || undefined,
      companyName: input.companyName || undefined,
    };
  }
}
