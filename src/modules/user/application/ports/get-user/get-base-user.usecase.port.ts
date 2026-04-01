import { IGetBaseUserOutput } from '../../output';

export interface IGetBaseUserUseCase {
  execute(input: {
    id: string;
  }): Promise<{ status: string; message: string; data: IGetBaseUserOutput }>;
}
