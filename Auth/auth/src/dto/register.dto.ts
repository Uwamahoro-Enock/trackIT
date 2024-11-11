import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(7)
  password: string;
}
