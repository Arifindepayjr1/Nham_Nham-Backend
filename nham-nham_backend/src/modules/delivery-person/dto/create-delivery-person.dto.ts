import { Expose, Type } from "class-transformer";
import { IsInt, IsOptional, IsPhoneNumber, IsString, Length, ValidateNested} from "class-validator";
import { CreateLocationDTO } from "src/modules/location/dto/create-location.dto";
import { Location } from "src/modules/location/entities/location.entity";

export class CreateDeliveryPersonDTO{

    @Expose()
    @Type(() => String)
    @Length(3, 50, {
        message: '$name should be between longer than 3 and no longer than 50'
    })
    @IsString({
        message: '$value should be a valid string'
    })
    name!: string;
    
    @Expose()
    @Type(() => String)
    @IsPhoneNumber('KH', {
        message: '$value should be a valid Cambodia Format ( +855 .. )'
    })
    phoneNumber!: string;


    @Expose()
    @IsInt({
        message: '$value should be a valid Int'
    })
    currentLocationId!: number;
}
