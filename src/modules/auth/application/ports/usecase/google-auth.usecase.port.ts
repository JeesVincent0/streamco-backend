import { GoogleAuthInPut } from '../../inputs';
import { GoogleAuthUseCaseOutPut } from '../../output';

export interface IGoogleAuthUseCase {
  execute(input: GoogleAuthInPut): Promise<GoogleAuthUseCaseOutPut>;
}
