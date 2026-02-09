import { UserRepository } from '@/modules/user/application/ports';
import {
  AuthCachedUserRepository,
  IdGenerator,
  MailService,
  OtpService,
  PasswordHasher,
} from '../ports';
import { Email } from '@/modules/user/domain/value-objects';
import { OtpPolicy } from '../../domain/service/otp-policy';
import { OtpPurpose } from '../../domain/enums';

export class GenerateOtpUseCase {
  constructor(
    private readonly _otpRepository: OtpService,
    private readonly _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _cacheRepository: AuthCachedUserRepository,
    private readonly _mailService: MailService,
  ) {}

  async execute(input: { email: string; purpose: OtpPurpose }) {
    console.log('Executing GenerateOtpUseCase with input:', input);
    const email = Email.create(input.email);

    const userExiting = await this._userRepository.findByEmail(email);

    if (!userExiting) {
      throw new Error('Wrong email ID');
    }

    const otp = this._otpRepository.generate();
    const hashedOtp = await this._passwordHasher.hash(otp.toString());
    const id = userExiting.getId();

    const otpStat = OtpPolicy.createInitialState(
      userExiting.getId(),
      email.getValue(),
      hashedOtp,
      input.purpose,
    );

    await this._cacheRepository.save(id, otpStat, 300);

    await this._mailService.sendOtp(email, otp);

    console.log(`OTP for ${email.getValue()}: ${otp}`);
    console.log(`ID for ${email.getValue()}: ${id}`);
  }
}
