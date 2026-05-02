import { Controller, Get, HttpStatus, ParseIntPipe , Put ,Param, Post, Body, Delete , HttpCode} from '@nestjs/common';
import { LocationService } from './location.service';
import { ILocationResponse } from './interface/location.response.interface';
import { CreateLocationDTO } from './dto/create-location.dto';
import { Location } from './entities/location.entity';

@Controller('api/location')
export class LocationController {
    locationResponse: ILocationResponse;
    constructor(
        private readonly locationService: LocationService
    ) { 
        this.locationResponse = {
            data: [],
            message: "Response Successfully",
            status: HttpStatus.ACCEPTED
        } 
    }
    
    @Get()
    async findAll() : Promise<ILocationResponse> {
        const locations = await this.locationService.findAll();
        return {
            ...this.locationResponse,
            data: locations,
            status: HttpStatus.OK,
            message: "Successfully Getting All Locations"
        }
    }

    @Get(":id")
    async findOne(@Param('id', ParseIntPipe) id: number) : Promise<ILocationResponse> {
        const location = await this.locationService.findOne(id);
        return {
            ...this.locationResponse,
            data: location,
            status: HttpStatus.OK,
            message: "Successfully Getting Location By ID",
        }
    }

    @Post()
    async create(@Body() createLoactionData : CreateLocationDTO) : Promise<ILocationResponse> {
        const location = await this.locationService.create(createLoactionData);
        return {
            ...this.locationResponse,
            data: location,
            status: HttpStatus.CREATED,
            message: "Successfully Creating Location",
        }
    }

    @Put(":id")
    async update(
        @Param('id', ParseIntPipe) id ,
        @Body() updateLocationData: Partial<Location>
    ): Promise<ILocationResponse>{
        const location = await this.locationService.update(
            id,
            updateLocationData
        );

        return {
            ...this.locationResponse,
            data: location,
            status: HttpStatus.OK,
            message: "Successfully Update Location"
        }
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.locationService.delete(id);
        return {
            ...this.locationResponse,
            data: {},
            status: HttpStatus.NO_CONTENT,
            message: "Successfully Delete Location",
        }
    }
}