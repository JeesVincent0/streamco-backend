import { Email } from '@/modules/user/domain/value-objects';
import { OtpDto } from '../dto';
import { AuthCachedUserRepository } from '../ports';
import { FileLogger } from '@/shared/logger/file-logger';
import { CachedUser } from '../types/user-cache.types';

export class OtpVerificationUseCase {
  constructor(
    private readonly _cachedUserRepo: AuthCachedUserRepository,
    private readonly _logger: FileLogger,
  ) {}

  async execute(input: OtpDto) {
    const email = Email.create(input.email);
    this._logger.debug({ email: email.getValue(), otp: input.otp });
    const cachedUser = await this._cachedUserRepo.get<CachedUser>(email);
    if (cachedUser) this._logger.debug({ ...cachedUser });
  }
}
