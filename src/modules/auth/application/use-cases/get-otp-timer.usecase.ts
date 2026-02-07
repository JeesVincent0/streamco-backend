import { BadRequestError } from '@/shared/errors';
import { AuthCachedUserRepository } from '../ports';
import { OtpTimer } from '../../domain/service/get-otp-timer';
import { OtpSate } from '../../domain/service/otp-policy';

export class GetOtpTimerUseCase {
  constructor(private readonly _cacheRepository: AuthCachedUserRepository) {}
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

    const remainingTime = OtpTimer.Get(cachedUser.resendAvalableAt);
    return {
      status: 'success',
      data: {
        timer: remainingTime,
      },
    };
  }
}
