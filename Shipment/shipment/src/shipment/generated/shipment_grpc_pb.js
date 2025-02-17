// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var shipment_pb = require('./shipment_pb.js');

function serialize_shipment_ShipmentRequest(arg) {
  if (!(arg instanceof shipment_pb.ShipmentRequest)) {
    throw new Error('Expected argument of type shipment.ShipmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shipment_ShipmentRequest(buffer_arg) {
  return shipment_pb.ShipmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shipment_ShipmentResponse(arg) {
  if (!(arg instanceof shipment_pb.ShipmentResponse)) {
    throw new Error('Expected argument of type shipment.ShipmentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shipment_ShipmentResponse(buffer_arg) {
  return shipment_pb.ShipmentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ShipmentServiceService = exports.ShipmentServiceService = {
  getShipments: {
    path: '/shipment.ShipmentService/GetShipments',
    requestStream: false,
    responseStream: false,
    requestType: shipment_pb.ShipmentRequest,
    responseType: shipment_pb.ShipmentResponse,
    requestSerialize: serialize_shipment_ShipmentRequest,
    requestDeserialize: deserialize_shipment_ShipmentRequest,
    responseSerialize: serialize_shipment_ShipmentResponse,
    responseDeserialize: deserialize_shipment_ShipmentResponse,
  },
};

exports.ShipmentServiceClient = grpc.makeGenericClientConstructor(ShipmentServiceService, 'ShipmentService');
