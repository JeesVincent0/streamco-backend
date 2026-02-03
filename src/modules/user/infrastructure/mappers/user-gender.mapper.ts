import { BadRequestError } from '@/shared/errors';
import { UserGender } from '../../domain/enums';

export class GenderMapper {
  static mapGender(value: string): UserGender {
    if (!Object.values(UserGender).includes(value as UserGender)) {
      throw new BadRequestError('Invalid gender value');
    }
    return value as UserGender;
  }
}
