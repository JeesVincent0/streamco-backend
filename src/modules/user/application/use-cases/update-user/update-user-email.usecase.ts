import { SucceessResType } from '@/shared/types/success-res.type';
import { UpdateUserEmailInput } from '../../inputs/update-user';
import { UpdateUserEmailInterface } from '../../interfaces';

export class UpdateUserEmailUseCase implements UpdateUserEmailInterface {
  execute(input: UpdateUserEmailInput): Promise<SucceessResType> {}
}
