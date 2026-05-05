import { HttpStatus } from "@nestjs/common";
import { DeliveryPerson } from "../entities/delivery-person.entity";

export class IDeliveryPersonResponse{
    data!: [] | {} | DeliveryPerson ;
    status!: HttpStatus;
    message!: string;
}