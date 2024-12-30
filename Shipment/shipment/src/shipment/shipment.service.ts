import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './shipment.schema';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(@InjectModel(Shipment.name) private shipmentModel: Model<Shipment>) {}

  // Retrieve all shipments
  async findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().exec();
  }

  // Retrieve a shipment by tracking number
  async findOne(trackingNumber: string): Promise<Shipment | null> {
    return this.shipmentModel.findOne({ trackingNumber }).exec();
  }

  // Retrieve shipments for a specific user
  async findByUser(userId: string): Promise<Shipment[]> {
    return this.shipmentModel.find({ userId: userId }).exec();
  }

  // Create a new shipment
  async create(input: CreateShipmentInput): Promise<Shipment> {
    const newShipment = new this.shipmentModel(input);
    return newShipment.save();
  }

  // Update an existing shipment
  async update(trackingNumber: string, input: UpdateShipmentInput): Promise<Shipment> {
    const shipment = await this.shipmentModel.findOneAndUpdate(
      { trackingNumber },
      { $set: input },
      { new: true } // Return the updated document
    ).exec();

    if (!shipment) {
      throw new NotFoundException(`Shipment with tracking number ${trackingNumber} not found.`);
    }

    return shipment;
  }

  // Delete a shipment by tracking number
  async delete(trackingNumber: string): Promise<boolean> {
    const result = await this.shipmentModel.deleteOne({ trackingNumber }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Shipment with tracking number ${trackingNumber} not found.`);
    }

    return true;
  }
}
