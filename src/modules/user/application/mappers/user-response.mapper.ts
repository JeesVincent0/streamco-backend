import { BaseUser } from '../../domain';
import { IGetBaseUserOutput } from '../output/get-base-user.output';

export class UserResponseMapper {
  static toBaseUserOutput(user: BaseUser): IGetBaseUserOutput {
    return {
      user: {
        id: user.id,
        email: user.email.getValue(),
        displayName: user.displayName,
      },
      role: user.role,
    };
  }
}
