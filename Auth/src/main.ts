import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UserService } from './user/user.service';
import { UserServiceService } from './generated/user_grpc_pb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Start the HTTP server
  await app.listen(process.env.PORT ?? 3000);
  console.log(`HTTP server running on port: http://localhost:${process.env.PORT ?? 3000}`);

  // Start the gRPC server
  const grpcServer = new Server();
  const userService = app.get(UserService); // Get the UserService instance

  // Add the UserService implementation to the gRPC server
  grpcServer.addService(UserServiceService as any, {
    getUser: (call, callback) => {
      userService
        .getUser(call.request)
        .then((response) => callback(null, response))
        .catch((err) => callback(err, null));
    },
  });

  // Start the gRPC server
  console.log('Starting gRPC server...');
  grpcServer.bindAsync(
    '0.0.0.0:50051', // gRPC server address
    ServerCredentials.createInsecure(),
    () => {
      grpcServer.start();
      console.log('gRPC server running on port: 0.0.0.0:50051');
    },
  );
}

bootstrap();