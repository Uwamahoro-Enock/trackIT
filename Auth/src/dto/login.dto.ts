import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginDto {

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(7)
  password: string;
}
