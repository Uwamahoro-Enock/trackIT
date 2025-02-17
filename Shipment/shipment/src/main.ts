import { NestFactory } from '@nestjs/core';
import { ShipmentModule } from './shipment/shipment.module';
import { GrpcServer } from './grpc.server'; // Import the gRPC server
import { ShipmentService } from './shipment/shipment.service';

async function bootstrap() {
  const app = await NestFactory.create(ShipmentModule); // Standard HTTP application
  await app.listen(8000);
  console.log('Application is running on http://localhost:8000');

  // Start the gRPC server
  const shipmentService = app.get(ShipmentService); // Get the ShipmentService instance
  const grpcServer = new GrpcServer(shipmentService);
  grpcServer.start();
}
bootstrap();