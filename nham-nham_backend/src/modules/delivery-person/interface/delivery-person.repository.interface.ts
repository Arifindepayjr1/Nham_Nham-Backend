import { CreateDeliveryPersonDTO } from "../dto/create-delivery-person.dto";
import { UpdateDeliveryPersonDTO } from "../dto/update-delivery-person.dto";
import { DeliveryPerson } from "../entities/delivery-person.entity";

export interface IDeliveryPerson {
    findOne(id: number): Promise<DeliveryPerson>;
    create(createDeliveryPersonData: CreateDeliveryPersonDTO): Promise<DeliveryPerson>;
    update(id: number , updateDeliveryPersonData: UpdateDeliveryPersonDTO): Promise<DeliveryPerson>;
    delete(id: number): Promise<void>;
}