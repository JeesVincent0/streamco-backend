import { Email } from '@/modules/user/domain/value-objects';
import { OtpDto } from '../dto/otp.dto';
import { AuthCachedUserRepository } from '../ports/user-cache-repository';

export class UserVerificationUserCase {
  constructor(private readonly _cachedUserRepo: AuthCachedUserRepository) {}
  async execute(dto: OtpDto) {
    const email = Email.create(dto.email);
    const cachedUser = await this._cachedUserRepo.get(email);
    console.log(cachedUser);
  }
}
