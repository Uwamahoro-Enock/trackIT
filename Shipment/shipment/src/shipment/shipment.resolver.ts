import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './jwt/auth.guard';
import { CreateShipmentInput } from './dto/create-shipment.input';

@Resolver(of => Shipment)
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  // Get all shipments (protected route)
  
  @Query(() => [Shipment])
  @UseGuards(AuthGuard)
  async shipments(@Context() context: any) {
    console.log('User from token:', context.req.user);
    return await this.shipmentService.findAll();
  }

  // Get shipments for a specific user (protected route)
  @UseGuards(AuthGuard)
  @Query(returns => [Shipment])
  async usershipments(
    @Args('userId') userId: string, 
    @Context() context: any
  ) {
    const tokenUserId = context.req.user.userId; // Extract userId from the token
    console.log('User ID from token:', tokenUserId);

    if (tokenUserId !== userId) {
      throw new Error('Unauthorized access to user shipments');
    }

    return this.shipmentService.findByUser(userId);
  }

  // Get a specific shipment by tracking number (unprotected route)
  @Query(returns => Shipment, { nullable: true })
  async shipment(@Args('trackingNumber') trackingNumber: string) {
    return this.shipmentService.findOne(trackingNumber);
  }

  // Create a shipment (protected route)
  @UseGuards(AuthGuard)
  @Mutation(returns => Shipment)
  async createShipment(
    @Args('input') input: CreateShipmentInput, 
    @Context() context: any
  ) {
    const userId = context.req.user.userId; // Extract userId from the token
    console.log('Creating shipment for user:', userId);

    return this.shipmentService.create({ ...input, userId });
  }
}
