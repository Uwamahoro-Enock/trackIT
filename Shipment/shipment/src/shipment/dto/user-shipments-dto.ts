import { Shipment } from "../shipment.schema";
import { ObjectType, Field } from "@nestjs/graphql";


@ObjectType()
export class UserShipmentResponse {
    @Field()
    email: string;

    @Field()
    name?: string;

    @Field(() => [Shipment])
    shipments: Shipment[]
}