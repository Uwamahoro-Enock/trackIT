import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Prop({ required: true, enum: ['Admin', 'User'], default: 'User' })
  @Field()
  role: string;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
