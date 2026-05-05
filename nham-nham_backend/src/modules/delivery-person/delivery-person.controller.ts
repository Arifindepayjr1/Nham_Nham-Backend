import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post , Body , Patch, Delete} from '@nestjs/common';
import { IDeliveryPersonResponse } from './interface/delivery-person.reponse.interface';
import { DeliveryPersonService } from './delivery-person.service';
import { DeliveryPerson } from './entities/delivery-person.entity';
import { CreateDeliveryPersonDTO } from './dto/create-delivery-person.dto';
import { UpdateDeliveryPersonDTO } from './dto/update-delivery-person.dto';

@Controller('api/delivery-person')
export class DeliveryPersonController {
    private deliveryPersonResponse: IDeliveryPersonResponse;
    
    constructor(private readonly deliveryPersonService: DeliveryPersonService) {
        this.deliveryPersonResponse = {
            data: [],
            message: "",
            status: HttpStatus.ACCEPTED
        }
    }

    @Get(':id')
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<IDeliveryPersonResponse> {
        const deliveryPerson = await this.deliveryPersonService.findOne(id);
        return {
            ...this.deliveryPersonResponse,
            data: deliveryPerson,
            message: "Successfully Getting Delivery Person By Id",
            status: HttpStatus.OK,
        };
    }

    @Post()
    async create(@Body() createDeliveryPerson: CreateDeliveryPersonDTO) : Promise<IDeliveryPersonResponse> {
        const newDeliveryPerson = await this.deliveryPersonService.create(createDeliveryPerson);
        return {
            ...this.deliveryPersonResponse,
            data: newDeliveryPerson,
            status: HttpStatus.CREATED,
            message: "Successfully Create Delivery Person"
        }
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDeliveryPersonData: UpdateDeliveryPersonDTO
    ): Promise<IDeliveryPersonResponse>{
        const updateDeliveryPerson = await this.deliveryPersonService.update(id, updateDeliveryPersonData);
        return {
            ...this.deliveryPersonResponse,
            data: updateDeliveryPerson,
            status: HttpStatus.OK,
            message: "Successfully Update Delivery Person",
        }
    }

    @Delete(":id")
    async delete(
        @Param("id", ParseIntPipe) id: number,
    ) : Promise<IDeliveryPersonResponse> {
        await this.deliveryPersonService.delete(id);
        return {
            data: {},
            status: HttpStatus.NO_CONTENT,
            message: "Successfully Delete Delivery Person",
        }
    }

}
