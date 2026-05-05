import { Injectable } from '@nestjs/common';
import { DeliveryPersonRepository } from './repositories/delivery-person.repository';
import { DeliveryPerson } from './entities/delivery-person.entity';
import { CreateDeliveryPersonDTO } from './dto/create-delivery-person.dto';
import { UpdateDeliveryPersonDTO } from './dto/update-delivery-person.dto';

@Injectable()
export class DeliveryPersonService {
    constructor(
        private readonly deliveryPersonRepository: DeliveryPersonRepository
    ) { }
    
    async findOne(id: number) : Promise<DeliveryPerson> {
        const deliveryPerson = await this.deliveryPersonRepository.findOne(id);
        return deliveryPerson;
    }

    async create(createDeliveryPersonData: CreateDeliveryPersonDTO): Promise<DeliveryPerson>{
        const newDeliveryPerson = await this.deliveryPersonRepository.create(createDeliveryPersonData);
        return newDeliveryPerson;
    }

    async update(id: number, updateDeliveryPersonData: UpdateDeliveryPersonDTO): Promise<DeliveryPerson>{
        const updateDeliveryPerson = await this.deliveryPersonRepository.update(id, updateDeliveryPersonData);
        return updateDeliveryPerson;
    }

    async delete(id: number) : Promise<void> {
        await this.deliveryPersonRepository.delete(id);
    }
}
