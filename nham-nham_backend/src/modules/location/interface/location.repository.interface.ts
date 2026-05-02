import { CreateLocationDTO } from "../dto/create-location.dto";
import { Location } from "../entities/location.entity";

export interface ILocationRepository{
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    create(createLocationData: CreateLocationDTO): Promise<Location>;
    update(id: number, updateLocationData: Partial<Location>): Promise<Location>;
    delete(id: number): Promise<void>;
}