import { SucceessResType } from '@/shared/types/success-res.type';
import { SocialLinksInput } from '../inputs/update-user';

export interface UpdateUserSocialLinksInterface {
  execute(input: SocialLinksInput): Promise<SucceessResType>;
}
