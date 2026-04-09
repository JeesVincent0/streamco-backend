import { ILogger } from '@/shared/logger';
import { Email } from '@/modules/user/domain';
import { SucceessOtpSend } from '../../output';
import { BadRequestError } from '@/shared/errors';
import { OtpPurpose } from '@/modules/auth/domain';
import { UpdateUserEmailInput } from '../../inputs/update-user';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import type { SendOtpInterface } from '@/shared/application/ports';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import type { ICheckUserExists, IUpdateUserEmailUseCase } from '../../ports';

export class UpdateUserEmailUseCase implements IUpdateUserEmailUseCase {
  constructor(
    private readonly _checkUserExists: ICheckUserExists,
    private readonly _sendOtp: SendOtpInterface,
    private readonly _logger: ILogger,
  ) {}
  async execute(input: UpdateUserEmailInput): Promise<SucceessOtpSend> {
    const email = Email.create(input.newEmail);
    const isUserExists = await this._checkUserExists.execute(
      email,
      input.userId,
    );

    if (isUserExists) {
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_EMAIL_ID);
    }

    const responseData = await this._sendOtp.execute(
      input.userId,
      email,
      OtpPurpose.CHANGE_EMAIL,
    );
    this._logger.log({
      event: LOG_EVENTS.OTP_CREATED,
      context: 'UpdateUserEmailUseCase',
      id: input.userId,
    });

    return {
      status: 'success',
      message: 'OTP send to the new email',
      data: responseData,
    };
  }
}
