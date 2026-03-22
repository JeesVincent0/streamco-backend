import { SocialLinksInput } from '../../inputs/update-user';
import { SucceessResType } from '@/shared/types/success-res.type';

export interface IUpdateUserSocialLinksUseCase {
  execute(input: SocialLinksInput): Promise<SucceessResType>;
}
