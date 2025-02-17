import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
// Update these paths based on your actual file structure
import { ShipmentServiceService, IShipmentServiceServer } from './shipment/generated/shipment_grpc_pb';
import { ShipmentRequest, ShipmentResponse, Shipment } from './shipment/generated/shipment_pb';
import { ShipmentService } from './shipment/shipment.service';

export class GrpcServer {
    private server: grpc.Server;
  
    constructor(private readonly shipmentService: ShipmentService) {
      this.server = new grpc.Server();
    }
  

  start() {
    // Load the protobuf file
    const PROTO_PATH = join(__dirname, '../proto/shipment.proto');
    const packageDefinition = loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const shipmentProto = grpc.loadPackageDefinition(packageDefinition).shipment;

    // Define the service implementation
    const shipmentServiceImpl: IShipmentServiceServer = {
      getShipments: async (call, callback) => {
        const request = call.request;
        const userId = request.getUserid();

        try {
          // Use your existing ShipmentService to fetch shipments
          const shipments = await this.shipmentService.findByUser(userId);

          // Map the shipments to the gRPC response format
          const response = new ShipmentResponse();
          shipments.forEach((shipment) => {
            const grpcShipment = new Shipment();
            grpcShipment.setId(shipment.id);
            grpcShipment.setTrackingnumber(shipment.trackingNumber);
            grpcShipment.setStatus(shipment.status);
            grpcShipment.setOrigin(shipment.origin);
            grpcShipment.setDestination(shipment.destination);
            grpcShipment.setCreatedat(shipment.createdAt.toISOString());
            grpcShipment.setUserid(shipment.userId);
            grpcShipment.setStatushistoryList(shipment.statusHistory);

            response.addShipments(grpcShipment);
          });

          callback(null, response);
        } catch (err) {
          callback(err, null);
        }
      },
    };

    // Add the service to the server
    this.server.addService(ShipmentServiceService, shipmentServiceImpl);

    // Start the server
    this.server.bindAsync(
      '0.0.0.0:50052',
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error('Failed to start gRPC server:', err);
          return;
        }
        console.log(`gRPC server running on port ${port}`);
        this.server.start();
      }
    );
  }
}