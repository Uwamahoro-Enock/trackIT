import { Module } from '@nestjs/common';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import * as express from 'express';
import * as cors from 'cors';

@Module({})
export class AppModule {
  private gateway: ApolloGateway;
  private server: ApolloServer;

  constructor() {
    this.gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'auth', url: 'http://localhost:3000/graphql' },
          { name: 'shipment', url: 'http://localhost:8000/graphql' },
        ],
      }),
    });

    this.server = new ApolloServer({
      gateway: this.gateway,
      // subscriptions: false,
    });
  }

  async startServer() {
    const app = express();
    
    app.use(cors());
    app.use(express.json());

    // Start the Apollo Server
    await this.server.start();

    // Apply Apollo middleware to the Express app
    app.use('/graphql', expressMiddleware(this.server));

    // Start the Express server
    const port = 4000;
    app.listen(port, () => {
      console.log(`🚀 Gateway ready at http://localhost:${port}/graphql`);
    });
  }
}
