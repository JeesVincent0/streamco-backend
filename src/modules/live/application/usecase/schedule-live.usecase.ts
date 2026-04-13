import { BadRequestError } from '@/shared/errors';
import { ScheduleLiveInput } from '../inputs';
import { IScheduleLiveUseCase } from '../ports';

export class ScheduleLiveUseCase implements IScheduleLiveUseCase {
  execute(input: ScheduleLiveInput) {
    console.log(input);
    throw new BadRequestError(`TEST ERROR LIVE USECASE`);
  }
}
