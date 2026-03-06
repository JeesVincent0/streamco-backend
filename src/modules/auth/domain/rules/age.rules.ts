import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { BadRequestError } from '@/shared/errors';

export class AgeRules {
  static isValidAge(dateOfBirth: Date): void {
    let isValid: boolean;
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      isValid = age - 1 >= 12;
    }
    isValid = age >= 12;

    if (!isValid) {
      throw new BadRequestError(ERROR_MESSAGES.AGE_MUST_BE_12);
    }
  }
}
