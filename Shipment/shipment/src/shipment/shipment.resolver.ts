import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.schema';
import { UnauthorizedException, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from './jwt/auth.guard';
import { RolesGuard } from './jwt/role.guard';
import { Roles } from './jwt/role.decorator';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';
import { Role } from './dto/role.enum';


@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(
    private readonly shipmentService: ShipmentService,
  ) {}


  // Get all shipments (Admin only)
  @Query(() => [Shipment])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async shipments(@Context() context: any) {
    console.log('User from token:', context.req.user);
    return await this.shipmentService.findAll();
  }

  // Get shipments for a specific user (User or Admin)
  @Query(() => [Shipment])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  async usershipments(
    @Args('userId') userId: string,
    @Context() context: any
  ) {
    const tokenUserId = context.req.user.userId;
    const userRole = context.req.user.role;
    console.log('User ID from token:', tokenUserId);

    // Allow only if the user is the owner or has an admin role
    if (tokenUserId !== userId && userRole !== Role.Admin) {
      throw new ForbiddenException('Unauthorized access to user shipments');
    }

    return this.shipmentService.findByUser(userId);
  }

  // Get a specific shipment by tracking number (unprotected route)
  @Query(() => Shipment, { nullable: true })
  async shipment(@Args('trackingNumber') trackingNumber: string) {
    return this.shipmentService.findOne(trackingNumber);
  }

  // Create a shipment (User or Admin)
  @Mutation(() => Shipment)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createShipment(
    @Args('input') input: CreateShipmentInput,
    @Context() context: any
  ) {
    console.log('User from token:', context.req);
    const user = context.req.user;

    // Ensure the user is authenticated
    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    // Proceed with shipment creation
    return this.shipmentService.create({
      ...input,
    });
  }

  // Update a shipment (Admin only)
  @Mutation(() => Shipment)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateShipment(
    @Args('trackingNumber') trackingNumber: string,
    @Args('input') input: UpdateShipmentInput,
  ) {
    const shipment = await this.shipmentService.findOne(trackingNumber);

    if (!shipment) {
      throw new Error('Shipment not found');
    }

    return this.shipmentService.update(trackingNumber, input);
  }

  // Delete a shipment (Admin only)
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteShipment(@Args('trackingNumber') trackingNumber: string): Promise<boolean> {
    const shipment = await this.shipmentService.findOne(trackingNumber);

    if (!shipment) {
      throw new Error('Shipment not found');
    }

    await this.shipmentService.delete(trackingNumber);
    return true;
  }
}