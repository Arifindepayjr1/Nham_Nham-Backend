import { Type } from "class-transformer";
import { IsInt, IsLatitude, IsLongitude, IsString, Length } from "class-validator";

export class CreateLocationDTO {

    @Type(() => Number)
    @IsLatitude({
        message: "Latitude Should Be Valid"
    })
    latitude!: number;


    @Type(() => Number)
    @IsLongitude({
        message: "Longitude Should Be Valid"
    })
    longitude!: number;

    @Type(() => String)
    @IsString({
        message: "Addresss Must Be String"
    })
    @Length(5, 255, {
        message: "Length Must Between 5 character to 255 character"
    })
    address!: string;
}