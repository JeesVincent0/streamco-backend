import { FileLogger } from '@/shared/logger/file-logger';
import { AdvertiserRegisterInput } from '../inputs';
import { Email } from '@/modules/user/domain/value-objects';

export class AdvertiserRegisterUseCase {
  constructor(private _logger: FileLogger) {}
  execute(input: AdvertiserRegisterInput) {
    const email = Email.create(input.email);
    this._logger.debug(input);
    return {
      status: true,
      message: 'Advertiser account created successfully',
      data: {
        email: email.getValue(),
      },
    };
  }
}
