import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateShipmentInput {
  @Field()
  trackingNumber: string;

  @Field()
  status: string;

  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  userId: string;

}
