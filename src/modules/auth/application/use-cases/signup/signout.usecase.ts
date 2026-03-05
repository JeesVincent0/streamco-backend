export class SignoutUseCase {
  constructor() {}
  execute() {
    return {
      status: 'success',
      message: 'Successfully logout',
    };
  }
}
