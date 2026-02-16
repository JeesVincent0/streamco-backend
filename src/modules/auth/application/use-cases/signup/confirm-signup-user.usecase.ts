import { UserRepositoryPort } from '@/modules/user/application/ports';
import { ConfirmRegistrationInput } from '../../inputs';
import { VerifyOtpUseCase } from '../otp/verify-otp.usecase';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { Email } from '@/modules/user/domain/value-objects';

/*
 *
 * Use case for confirming user registration.
 * It verifies the OTP provided by the user,
 * checks the OTP purpose,
 * finds the user by email,
 * verifies the user,
 * and saves the updated user.
 *
 */

export class ConfirmSignupUserUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _verifyOtpUseCase: VerifyOtpUseCase,
  ) {}
  async execute(input: ConfirmRegistrationInput) {
    // Verifying the OTP provided by the user
    const result = await this._verifyOtpUseCase.execute({
      id: input.id,
      otp: input.otp,
      purpose: OtpPurpose.REGISTRATION,
    });

    const email = Email.create(result.email);

    // Finding user by email
    const user = await this._userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    user.verify();

    // Saving updated user
    await this._userRepo.save(user);

    return {
      status: 'success',
      message: 'Registration confirmed successfully',
    };
  }
}
