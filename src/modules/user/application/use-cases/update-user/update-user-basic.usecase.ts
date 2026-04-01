import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserBasicInput } from '../../inputs/update-user';
import type { IUpdateUserBasicRepo } from '../../ports/repository/update-user-basic.port';
import { IUpdateUserBasicUseCase } from '../../ports';

export class UpdateUserBasicUseCase implements IUpdateUserBasicUseCase {
  constructor(private readonly _updateUserBasicPort: IUpdateUserBasicRepo) {}
  async execute(input: UpdateUserBasicInput): Promise<SucceessResType> {
    await this._updateUserBasicPort.execute(input);
    return {
      status: 'success',
      message: 'User basic information updated successfully',
    };
  }
}
