import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateDeliveryPersonDTO } from "../dto/create-delivery-person.dto";
import { UpdateDeliveryPersonDTO } from "../dto/update-delivery-person.dto";
import { DeliveryPerson } from "../entities/delivery-person.entity";
import { IDeliveryPerson } from "../interface/delivery-person.repository.interface";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Location } from "../../location/entities/location.entity";
@Injectable()
export class DeliveryPersonRepository implements IDeliveryPerson {

    constructor(
        @InjectRepository(DeliveryPerson)
        private readonly deliveryPersonRepository: Repository<DeliveryPerson>,
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ) { }

    async findOne(id: number): Promise<DeliveryPerson> {
        const deliveryPerson = await this.deliveryPersonRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                currentLocation: true,
            }
        })

        if (deliveryPerson == null) {
            throw new HttpException(`Delivery Person Id : ${id} Not Found`, HttpStatus.NOT_FOUND);
        }

        return deliveryPerson;
    }

    async create(createDeliveryPersonData: CreateDeliveryPersonDTO): Promise<DeliveryPerson> {
        const currentLocation = await this.locationRepository.findOne({
            where: {
                id: createDeliveryPersonData.currentLocationId,
            }
        })
        if (currentLocation == null) {
            throw new HttpException(`${createDeliveryPersonData.currentLocationId} not found ` , HttpStatus.NOT_FOUND)
        };

        const newDeliveryPerson  = {
            name: createDeliveryPersonData.name,
            phoneNumber: createDeliveryPersonData.phoneNumber,
            currentLocation: currentLocation,
        }

        const deliveryPerson = await this.deliveryPersonRepository.create(newDeliveryPerson);
        await this.deliveryPersonRepository.save(deliveryPerson);
        return deliveryPerson;
    }

    async update(id: number, updateDeliveryPersonData: UpdateDeliveryPersonDTO): Promise<DeliveryPerson> {
        const deliveryPerson = await this.findOne(id);

        const updateDeliveryPerson = {
            ...deliveryPerson,
            ...updateDeliveryPersonData
        };

        await this.deliveryPersonRepository.save(updateDeliveryPerson);
        return updateDeliveryPerson;
    }

    async delete(id: number): Promise<void> {
        await this.deliveryPersonRepository.delete(id);
    }

}