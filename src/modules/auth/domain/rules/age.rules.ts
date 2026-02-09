export class AgeRules {
  static isValidAge(dateOfBirth: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      return age - 1 >= 12;
    }
    return age >= 12;
  }
}
