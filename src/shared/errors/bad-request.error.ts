import { AppError } from './app.error';

export class BadRequestError<T = undefined> extends AppError<T> {
  constructor(message: string, data?: T) {
    super(message, 400, data);
  }
}
