import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateShipmentInput {
  @Field()
  trackingNumber: string;

  @Field()
  status: string;

  @Field()
  origin: string;

  @Field()
  destination: string;
}
