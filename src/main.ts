import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { AppExceptionFilter } from './shared/filters/app-exception.filter';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import { FileLogger } from './shared/logger/file-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });

  const logger = app.get(FileLogger);

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(`${req.method} ${req.originalUrl}`);
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.useGlobalFilters(new AppExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
  logger.log(`Server is running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
