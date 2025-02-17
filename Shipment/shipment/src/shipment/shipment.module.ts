import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';
dotenv.config();

// Shipment-related imports
import { Shipment, ShipmentSchema } from './shipment.schema';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';


// gRPC imports
import { GrpcServer } from '../grpc.server';
@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(process.env.MONGO_URI),

    // MongoDB models
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }]),

    // GraphQL configuration for Apollo Federation
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
        federation: 2,
      },
      context: ({ req }) => ({ req }),
      playground: true,
      path: '/graphql',
    }),

    // HttpModule for making HTTP requests to the auth subgraph
    HttpModule,
  ],
  providers: [
    ShipmentService,
    {
      provide: GrpcServer,
      useFactory: (shipmentService: ShipmentService) => {
        return new GrpcServer(shipmentService);
      },
      inject: [ShipmentService],
    },
  ],
  exports: [ShipmentService],
})
export class ShipmentModule {}