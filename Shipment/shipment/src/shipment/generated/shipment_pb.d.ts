// package: shipment
// file: shipment.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ShipmentRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): ShipmentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ShipmentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ShipmentRequest): ShipmentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ShipmentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ShipmentRequest;
    static deserializeBinaryFromReader(message: ShipmentRequest, reader: jspb.BinaryReader): ShipmentRequest;
}

export namespace ShipmentRequest {
    export type AsObject = {
        userid: string,
    }
}

export class ShipmentResponse extends jspb.Message { 
    clearShipmentsList(): void;
    getShipmentsList(): Array<Shipment>;
    setShipmentsList(value: Array<Shipment>): ShipmentResponse;
    addShipments(value?: Shipment, index?: number): Shipment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ShipmentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ShipmentResponse): ShipmentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ShipmentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ShipmentResponse;
    static deserializeBinaryFromReader(message: ShipmentResponse, reader: jspb.BinaryReader): ShipmentResponse;
}

export namespace ShipmentResponse {
    export type AsObject = {
        shipmentsList: Array<Shipment.AsObject>,
    }
}

export class Shipment extends jspb.Message { 
    getId(): string;
    setId(value: string): Shipment;
    getTrackingnumber(): string;
    setTrackingnumber(value: string): Shipment;
    getStatus(): string;
    setStatus(value: string): Shipment;
    getOrigin(): string;
    setOrigin(value: string): Shipment;
    getDestination(): string;
    setDestination(value: string): Shipment;
    getCreatedat(): string;
    setCreatedat(value: string): Shipment;
    getUserid(): string;
    setUserid(value: string): Shipment;
    clearStatushistoryList(): void;
    getStatushistoryList(): Array<string>;
    setStatushistoryList(value: Array<string>): Shipment;
    addStatushistory(value: string, index?: number): string;

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): Shipment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Shipment.AsObject;
    static toObject(includeInstance: boolean, msg: Shipment): Shipment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Shipment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Shipment;
    static deserializeBinaryFromReader(message: Shipment, reader: jspb.BinaryReader): Shipment;
}

export namespace Shipment {
    export type AsObject = {
        id: string,
        trackingnumber: string,
        status: string,
        origin: string,
        destination: string,
        createdat: string,
        userid: string,
        statushistoryList: Array<string>,
        user?: User.AsObject,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;
    getName(): string;
    setName(value: string): User;
    getEmail(): string;
    setEmail(value: string): User;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        name: string,
        email: string,
    }
}
