// package: shipment
// file: shipment.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as shipment_pb from "./shipment_pb";

interface IShipmentServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getShipments: IShipmentServiceService_IGetShipments;
}

interface IShipmentServiceService_IGetShipments extends grpc.MethodDefinition<shipment_pb.ShipmentRequest, shipment_pb.ShipmentResponse> {
    path: "/shipment.ShipmentService/GetShipments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<shipment_pb.ShipmentRequest>;
    requestDeserialize: grpc.deserialize<shipment_pb.ShipmentRequest>;
    responseSerialize: grpc.serialize<shipment_pb.ShipmentResponse>;
    responseDeserialize: grpc.deserialize<shipment_pb.ShipmentResponse>;
}

export const ShipmentServiceService: IShipmentServiceService;

export interface IShipmentServiceServer extends grpc.UntypedServiceImplementation {
    getShipments: grpc.handleUnaryCall<shipment_pb.ShipmentRequest, shipment_pb.ShipmentResponse>;
}

export interface IShipmentServiceClient {
    getShipments(request: shipment_pb.ShipmentRequest, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
    getShipments(request: shipment_pb.ShipmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
    getShipments(request: shipment_pb.ShipmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
}

export class ShipmentServiceClient extends grpc.Client implements IShipmentServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getShipments(request: shipment_pb.ShipmentRequest, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
    public getShipments(request: shipment_pb.ShipmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
    public getShipments(request: shipment_pb.ShipmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: shipment_pb.ShipmentResponse) => void): grpc.ClientUnaryCall;
}
