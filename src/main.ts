import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './infra/validation-exception-filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [process.env.FRONT_URL],
      credentials: true,
      methods: 'GET,POST,PUT,DELETE,OPTIONS,HEAD,PATCH', // Restringe os métodos permitidos
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.use(cookieParser(process.env.COOKIE_KEY));
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
