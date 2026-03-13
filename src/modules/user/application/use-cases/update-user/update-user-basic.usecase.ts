import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserBasicInput } from '../../inputs/update-user';
import { UpdateUserBasicInterface } from '../../interfaces';

export class UpdateUserBasicUseCase implements UpdateUserBasicInterface {
  execute(input: UpdateUserBasicInput): Promise<SucceessResType> {}
}
