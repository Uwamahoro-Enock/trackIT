import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ShipmentServiceClient, Shipment as GrpcShipment } from './proto/shipment';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { Shipment as MongooseShipment } from './shipment.schema';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShipmentService implements OnModuleInit {
  private shipmentClient: ShipmentServiceClient;

  constructor(
    @Inject('SHIPMENT_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.shipmentClient = this.client.getService<ShipmentServiceClient>('ShipmentService');
  }

  async findAll(): Promise<MongooseShipment[]> {
    const response = await lastValueFrom(this.shipmentClient.findAll({} as any));
    return response.shipments.map(mapGrpcShipmentToMongoose);
  }

  async findOne(trackingNumber: string): Promise<MongooseShipment | null> {
    const response = await lastValueFrom(this.shipmentClient.findOne({ trackingNumber }));
    return response.shipment ? mapGrpcShipmentToMongoose(response.shipment) : null;
  }

  async create(input: CreateShipmentInput): Promise<MongooseShipment> {
    const response = await lastValueFrom(
      this.shipmentClient.create({
        trackingNumber: input.trackingNumber,
        origin: input.origin,
        destination: input.destination,
        status: input.status,
      })
    );
    return mapGrpcShipmentToMongoose(response.shipment!);
  }
}

// Define the mapping function to convert gRPC Shipment to Mongoose Shipment
function mapGrpcShipmentToMongoose(grpcShipment: GrpcShipment): MongooseShipment {
  return {
    _id: '', // Generate or assign a unique ID as needed
    createdAt: new Date(), // Set a default creation date or use actual data if available
    ...grpcShipment,
  } as MongooseShipment;
}
