import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './shipment.schema';
import { CreateShipmentInput } from './dto/create-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(@InjectModel(Shipment.name) private shipmentModel: Model<Shipment>) {}

  async findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().exec();
  }

  async findOne(trackingNumber: string): Promise<Shipment | null> {
    return this.shipmentModel.findOne({ trackingNumber }).exec();
  }

  async findByUser(userId: string): Promise<Shipment[]> {
    return this.shipmentModel.find({ userId: userId }).exec();
  }

  async create(input: CreateShipmentInput): Promise<Shipment> {
    const newShipment = new this.shipmentModel(input);
    return newShipment.save();
  }
}
