import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appModule = app.get(AppModule); // Get instance of AppModule
  await appModule.startServer(); // Start the server
}
bootstrap();
