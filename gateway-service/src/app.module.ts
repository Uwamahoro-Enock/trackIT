import { Module, OnModuleInit } from '@nestjs/common';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import * as express from 'express';
import * as cors from 'cors';

@Module({})
export class AppModule implements OnModuleInit {
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
      // Add custom RemoteGraphQLDataSource to handle forwarding the Authorization header
      buildService: ({ url }) =>
        new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            if (context?.req?.headers?.authorization) {
              request.http.headers.set(
                'Authorization',
                context.req.headers.authorization
              );
            }
          },
        }),
    });

    this.server = new ApolloServer({
      gateway: this.gateway,
      introspection: true,
    });
  }

  async startServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Pass the request object to the context
    await this.server.start();
    app.use(
      '/graphql',
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ req }), // Include the request in the context
      })
    );

    const port = 4000;
    app.listen(port, () => {
      console.log(`🚀 Gateway ready at http://localhost:${port}/graphql`);
    });
  }

  async onModuleInit() {
    try {
      await this.startServer();
    } catch (error) {
      console.error('Error starting Apollo Gateway:', error);
    }
  }
}
