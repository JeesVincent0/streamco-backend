import { TokenBlackListUseCase } from '../token';

export class SignoutUseCase {
  constructor(private readonly _tokenBlacklistUseCase: TokenBlackListUseCase) {}
  execute() {
    return {
      status: 'success',
      message: 'Successfully logoutted',
    };
  }
}
