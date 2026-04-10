import { ForbiddenException } from '@nestjs/common';

export class AppForbiddenException extends ForbiddenException {
  constructor(code: string, message: string) {
    super({
      success: false,
      error: {
        code,
        message,
      },
    });
  }
}
