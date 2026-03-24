import { TOKEN_TYPE } from '@/modules/auth/domain';

export interface ITokenBlackListUseCase {
  execute(token: string, type: TOKEN_TYPE);
}
