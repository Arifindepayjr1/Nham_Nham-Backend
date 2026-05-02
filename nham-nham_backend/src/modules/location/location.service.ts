import { BadRequestException, Injectable } from '@nestjs/common';
import { LocationRepository } from './repositories/location.repository';
import { CreateLocationDTO } from './dto/create-location.dto';
import { Location } from "./entities/location.entity";

@Injectable()
export class LocationService {
    constructor(
        private readonly locationRepository: LocationRepository
    ) { }    
    
    async create(createLocationData: CreateLocationDTO): Promise<Location>{
        if(createLocationData.latitude < -90 || createLocationData.latitude > 90) {
                throw new BadRequestException('Invalid latitude value');
            }
        if (createLocationData.longitude < -180 || createLocationData.longitude > 180) {
                throw new BadRequestException('Invalid longitude value');
        }
        return this.locationRepository.create(createLocationData);
    } 

    async findAll() : Promise<Location[]> {
        const locations = await this.locationRepository.findAll();

        return locations;
    }

    async findOne(id: number): Promise<Location>{
        const location = await this.locationRepository.findOne(id);
        
        return location;
    }

    async update(id: number, updateLocationData: Partial<Location>): Promise<Location>{
        const location = await this.locationRepository.update(
            id,
            updateLocationData
        );
        return location;
    }

    async delete(id: number) : Promise<void> {
        await this.locationRepository.delete(id);
    }
}
