import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsNotEmpty, IsAlpha, IsArray, ArrayNotEmpty, isString } from 'class-validator';

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

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  role: string[];
}
