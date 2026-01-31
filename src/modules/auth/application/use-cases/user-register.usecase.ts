import { OtpService } from '../ports/otp-service';
import { MailService } from '../ports/mail-sevice';
import { RegisterInputDto } from '../dto/register.dto';
import { PasswordHasher } from '../ports/password-hasher';
import { Email, Password } from '@/shared/domain/value-objects';
import { AuthCachedUserRepository } from '../ports/user-cache-repository';
import { UserRepository } from '@/modules/user/application/ports/user-repository';

export class RegisterUseCase {
  constructor(
    private readonly _otpService: OtpService,
    private readonly _mailService: MailService,
    private readonly _userRepo: UserRepository,
    private readonly _passwordHaser: PasswordHasher,
    private readonly _cachedUserRepo: AuthCachedUserRepository,
  ) {}

  async execute(input: RegisterInputDto) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const cachedUser = await this._cachedUserRepo.get(email);
    if (cachedUser) throw new Error('OTP already send, please verify');

    const exstingUser = await this._userRepo.findByEmail(email);
    if (exstingUser) throw new Error('User already existing');

    const hashedPassword = await this._passwordHaser.hash(password);
    input.password = hashedPassword;

    const otp = this._otpService.generate();

    await this._cachedUserRepo.save(
      email,
      {
        ...input,
        otp,
      },
      300,
    );

    await this._mailService.sendOtp(email, otp);
  }
}
