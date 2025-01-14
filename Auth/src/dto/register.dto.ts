import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsNotEmpty, IsArray, ArrayNotEmpty} from 'class-validator';

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

  @Field()
  @IsString() // Ensure role is a string
  role: string;
}
