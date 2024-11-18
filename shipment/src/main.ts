import { NestFactory } from '@nestjs/core';
import { ShipmentModule } from './shipment/shipment.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = NestFactory.createMicroservice<MicroserviceOptions>(ShipmentModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, './proto/shipment.proto'),
      package: 'shipment'
    }
  });
  (await app).listen();
}
bootstrap();
