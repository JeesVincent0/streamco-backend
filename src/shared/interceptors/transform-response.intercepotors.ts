import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE } from '../decorators';

export interface Response<T> {
  status: string;
  message: string;
  data?: T;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<
  T,
  Response<T> | T
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | T> {
    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE,
      context.getHandler(),
    );

    if (!message) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T): Response<T> => {
        const response: Response<T> = {
          status: 'success',
          message: message,
        };

        if (data !== undefined && data !== null) {
          response.data = data;
        }

        return response;
      }),
    );
  }
}
