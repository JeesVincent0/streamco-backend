import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../errors';

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError<unknown>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.message,
      data: exception.data ?? null,
    });
  }
}
