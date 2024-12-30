import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// Shipment-related imports
import { Shipment, ShipmentSchema } from './shipment.schema';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';

// Authentication imports
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.shipment';

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(process.env.MONGO_URI),
    
    // Shipment schema
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }]),

    // GraphQL with Apollo driver
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context	: ({ req }) => ({ req }),
      driver: ApolloFederationDriver,
      autoSchemaFile: {path:join(process.cwd(), 'src/schema.gql'),
      federation: 2
      },
      introspection: true, 
      playground: true,
      path: '/graphql', 
    }),

    // JWT Authentication modules
    PassportModule, // Enables Passport.js support
    JwtModule.register({
      secret: process.env.Jwt_SECRET, // JWT secret from environment variables
      signOptions: { expiresIn: process.env.JWT_EXPIRE }, // Token expiration time
    }),
  ],
  providers: [
    ShipmentResolver, // Handles GraphQL queries and mutations
    ShipmentService,  // Business logic
    JwtStrategy,      // JWT validation strategy
  ],
})
export class ShipmentModule {}
