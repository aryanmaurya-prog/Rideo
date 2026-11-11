import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const allowedOrigins = [
    'https://rideo-two.vercel.app',
    'https://rideo-git-main-aryan-8f3a.vercel.app',
    'http://localhost:3000',
    process.env.ADMIN_URL ?? 'http://localhost:3001',
    process.env.CUSTOMER_URL,
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: [...new Set(allowedOrigins)],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
