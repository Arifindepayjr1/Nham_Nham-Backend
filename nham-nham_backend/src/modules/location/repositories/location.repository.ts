import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILocationRepository } from "../interface/location.repository.interface";
import { CreateLocationDTO } from "../dto/create-location.dto";
import { Location } from "../entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LocationRepository implements ILocationRepository{
    constructor(
        @InjectRepository(Location) private locationRepository: Repository<Location>
    ) { }

    async findAll(): Promise<Location[]> {
        const locations = await this.locationRepository.find();

        if (locations.length >= 1) {
            return locations;
        }

        if (locations.length === 0) {
            return []
        }

        throw new HttpException(
                "Failed To Fetch Location From The Database",
                HttpStatus.INTERNAL_SERVER_ERROR
        )
        
    }

    async findOne(id: number): Promise<Location> {
        const location = await this.locationRepository.findOne({
            where: {
                id: id,
            }
        });

        if (location == null) {
            throw new HttpException(
                "No Matching Location Id is Found",
                HttpStatus.NOT_FOUND
            );
        }

        return location;


    }
    async create(createLocationData: CreateLocationDTO): Promise<Location>{
        const newLocation = await this.locationRepository.create({
            ...createLocationData
        });

        await this.locationRepository.save(newLocation);
        return newLocation;
    }
    
    async update(id: number, updateLocationData: Partial<Location>): Promise<Location>{
        const location = await this.findOne(id);
        const updateLocation = {
            ...location,
            ...updateLocationData,
        }

        await this.locationRepository.save(updateLocation);
        return updateLocation;
    }

    async delete(id: number): Promise<void>{
        const location = await this.findOne(id);
        const result = await this.locationRepository.remove(location);
    }
    
}