import { CreateAdvertiserUserInput } from '../../inputs';

import { CreateAdvertiserUser } from '../../ports';

export class CreateAdvertiserUserUseCase implements CreateAdvertiserUser {
  constructor() {}
  execute(input: CreateAdvertiserUserInput) {
    console.log(input);
  }
}
