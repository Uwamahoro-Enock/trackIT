import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../shipment.schema';  // Import your shipment schema

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Shipment.name) private shipmentModel: Model<Shipment>,  // Inject the Shipment model
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // You can validate the JWT payload against the Shipment collection if needed
    const shipment = await this.shipmentModel.findOne({ _id: payload.id });

    if (!shipment) {
      throw new Error('Shipment not found');
    }

    // Return shipment or any user-related data you want to use
    return shipment;
  }
}
