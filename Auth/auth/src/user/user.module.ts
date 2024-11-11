import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; 
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => {
        return{
          secret:config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE')
          }
        }
      }
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
 