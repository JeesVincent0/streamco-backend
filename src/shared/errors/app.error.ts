export class AppError<T = undefined> extends Error {
  public statusCode: number;
  public data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
