import { BadRequestError } from '@/shared/errors';
import { AuthCachedUserRepositoryPort } from '../ports';
import { OtpTimer } from '../../domain/service/get-otp-timer';
import { OtpSate } from '../../domain/service/otp-policy';

export class GetOtpTimerUseCase {
  constructor(
    private readonly _cacheRepository: AuthCachedUserRepositoryPort,
  ) {}
  async execute(id: string) {
    const cachedUser = await this._cacheRepository.get<OtpSate>(id);
    if (!cachedUser) {
      throw new BadRequestError<{ cachedUser: boolean }>(
        'There is no session',
        {
          cachedUser: false,
        },
      );
    }

    const remainingTime = OtpTimer.Get(cachedUser.otpResendAt);
    return {
      status: 'success',
      data: {
        timer: remainingTime,
      },
    };
  }
}
