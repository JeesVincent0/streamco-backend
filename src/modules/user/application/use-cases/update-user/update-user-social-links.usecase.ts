import { SucceessResType } from '@/shared/types/success-res.type';
import { SocialLinksInput } from '../../inputs/update-user';
import { UpdateUserSocialLinksInterface } from '../../interfaces';
import { UserRepositoryPort } from '../../ports';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { User, UserSocialMediaType } from '@/modules/user/domain';

export class UpdateUserSocialLinksUseCase implements UpdateUserSocialLinksInterface {
  constructor(private readonly _userRepo: UserRepositoryPort) {}
  async execute(input: SocialLinksInput): Promise<SucceessResType> {
    const user = (await this._userRepo.findById(input.id)) as User;
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (input.instagram && input.instagram.trim() !== '') {
      user.updateSocialLink(UserSocialMediaType.INSTAGRAM, input.instagram);
    }

    if (input.x && input.x.trim() !== '') {
      user.updateSocialLink(UserSocialMediaType.X, input.x);
    }

    if (input.facebook && input.facebook.trim() !== '') {
      user.updateSocialLink(UserSocialMediaType.FACEBOOK, input.facebook);
    }

    if (input.youtube && input.youtube.trim() !== '') {
      user.updateSocialLink(UserSocialMediaType.YOUTUBE, input.youtube);
    }

    await this._userRepo.save(user);
    return {
      status: 'success',
      message: 'User social links updated',
    };
  }
}
