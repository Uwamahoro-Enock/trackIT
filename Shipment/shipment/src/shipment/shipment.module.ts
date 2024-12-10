import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { join } from 'path';
import { Shipment, ShipmentSchema } from './shipment.schema';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot("mongodb+srv://enockdev01:9ZSj0QkXhEMyRCzu@cluster0.as0jw.mongodb.net/Ironjils?retryWrites=true"),
    
    // Shipment schema
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }]),
    
    // GraphQL with Apollo driver
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver, // Specify the Apollo driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true, 
      playground: true,
      path: '/graphql', // GraphQL endpoint
    }),
  ],
  providers: [
    ShipmentResolver, // Handles GraphQL queries and mutations
    ShipmentService,  // Business logic
  ],
})
export class ShipmentModule {}
