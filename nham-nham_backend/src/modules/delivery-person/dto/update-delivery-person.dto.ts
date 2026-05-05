import { Expose, Type } from "class-transformer";
import { CreateDeliveryPersonDTO } from "./create-delivery-person.dto";
import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

export class UpdateDeliveryPersonDTO {
    
        @IsOptional()
        @Expose()
        @Type(() => String)
        @Length(3, 50, {
            message: '$name should be between longer than 3 and no longer than 50'
        })
        @IsString({
            message: '$value should be a valid string'
        })
        name!: string;
        
        @IsOptional()
        @Expose()
        @Type(() => String)
        @IsPhoneNumber('KH', {
            message: '$value should be a valid Cambodia Format ( +855 .. )'
        })
        phoneNumber!: string;
    
    
 }