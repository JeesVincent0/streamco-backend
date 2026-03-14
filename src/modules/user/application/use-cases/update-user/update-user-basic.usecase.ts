import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserBasicInput } from '../../inputs/update-user';
import { UpdateUserBasicInterface } from '../../interfaces';
import type { UpdateUserBasicPort } from '../../ports/repository/update-user-basic.port';

export class UpdateUserBasicUseCase implements UpdateUserBasicInterface {
  constructor(private readonly _updateUserBasicPort: UpdateUserBasicPort) {}
  async execute(input: UpdateUserBasicInput): Promise<SucceessResType> {
    await this._updateUserBasicPort.execute(input);
    return {
      status: 'success',
      message: 'User basic information updated successfully',
    };
  }
}
