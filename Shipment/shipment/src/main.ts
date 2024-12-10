import { NestFactory } from '@nestjs/core';
import { ShipmentModule } from './shipment/shipment.module';

async function bootstrap() {
  const app = await NestFactory.create(ShipmentModule); // Standard HTTP application
  await app.listen(8000);
  console.log('Application is running on http://localhost:8000');
}
bootstrap();
