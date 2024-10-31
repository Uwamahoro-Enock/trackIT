import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.schema';
import { CreateShipmentInput } from './dto/create-shipment.input';

@Resolver(of => Shipment)
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query(returns => [Shipment])
  async shipments() {
    return this.shipmentService.findAll();
  }

  @Query(returns => Shipment, { nullable: true })
  async shipment(@Args('trackingNumber') trackingNumber: string) {
    return this.shipmentService.findOne(trackingNumber);
  }

  @Mutation(returns => Shipment)
  async createShipment(@Args('input') input: CreateShipmentInput) {
    return this.shipmentService.create(input);
  }
}
