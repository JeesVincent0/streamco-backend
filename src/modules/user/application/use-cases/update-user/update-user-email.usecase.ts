import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserEmailInput } from '../../inputs/update-user';
import { UpdateUserEmailInterface } from '../../interfaces';
import { Email } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

import type { CheckUserExistsPort } from '../../ports';
import type { CacheBaseRepoPort } from '@/shared/application/ports';

export class UpdateUserEmailUseCase implements UpdateUserEmailInterface {
  constructor(
    private readonly _checkUserExists: CheckUserExistsPort,
    private readonly _cacheBaseRepo: CacheBaseRepoPort,
  ) {}
  async execute(input: UpdateUserEmailInput): Promise<SucceessResType> {
    const email = Email.create(input.newEmail);
    const isUserExists = await this._checkUserExists.execute(
      email,
      input.userId,
    );
    if (isUserExists) {
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_EMAIL_ID);
    }

    await this._cacheBaseRepo.save(
      input.userId,
      { eamil: email.getValue() },
      500,
    );
    return {
      status: 'success',
      message: 'OTP send to the new email',
    };
  }
}
