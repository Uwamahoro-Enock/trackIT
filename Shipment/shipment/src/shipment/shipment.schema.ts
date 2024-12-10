import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Shipment extends Document {

  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  trackingNumber: string;

  @Field()
  @Prop({ required: true })
  status: string;

  @Field()
  @Prop({ required: true })
  origin: string;

  @Field()
  @Prop({ required: true })
  destination: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
