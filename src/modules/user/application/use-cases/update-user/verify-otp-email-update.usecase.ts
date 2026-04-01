import { VerifyOtpInput } from '@/shared/application/input';
import { VerifyOtpInterface } from '@/shared/application/ports';
import { SucceessResType } from '@/shared/types/success-res.type';
import {
  IUpdateUserEmailRepo,
  IVerifyOtpEmailUpdateUseCase,
} from '../../ports';

export class VerifyOtpEmailUpdateUseCase implements IVerifyOtpEmailUpdateUseCase {
  constructor(
    private readonly _verifyOtp: VerifyOtpInterface,
    private readonly _updateEmailRepo: IUpdateUserEmailRepo,
  ) {}
  async execute(input: VerifyOtpInput): Promise<SucceessResType> {
    const { email } = await this._verifyOtp.execute({
      id: input.id,
      otp: input.otp,
      purpose: input.purpose,
    });

    await this._updateEmailRepo.execute({ userId: input.id, newEmail: email });
    return {
      status: 'success',
      message: 'User email successfully updated',
    };
  }
}
