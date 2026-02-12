import { CreateAdvertiserUserInput } from '../../inputs';

import { CreateAdvertiserUserPort } from '../../ports';

export class CreateAdvertiserUserUseCase implements CreateAdvertiserUserPort {
  constructor() {}
  execute(input: CreateAdvertiserUserInput) {
    console.log('This data is from advertiser user: ', input);
  }
}
