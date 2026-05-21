import { Expose, Type } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, Length, Matches } from "class-validator";

export class SignUpUserDTO{
    @IsEmail()
    @Expose()
    @Type(() => String)
    email!: string;

    @Expose()
    @Type(() => String)
    @IsString({
        message: "User Name Must Be String"
    })
    @Length(3, 50, {
        message: '$value $property should be between $constraint1 and no longer than $constraint2'
    })
    userName!: string;


    @Expose()
    @Type(() => String)
    @IsPhoneNumber('KH', {
        message: '$value $property should be a valid $constraint1 Format (+855 ..)'
    })
    phoneNumber!: string;

    @Expose()
    @Type(() => String)
    @IsString({
        message: '$value should be a valid Letter'
    })
    @Length(3, 50, {
        message: '$value $property should be between $constraint1 and no longer than $constraint2'
    })
    @Matches(/(?=.*\d)/, { 
        message: '$property should contain atleast one digit'
    })
    @Matches(/(?=.*[!@#$%])/, {
        message: '$property should contain atleast one Special Character '
    })
    @Matches(/(?=(?:.*[A-Z]){2,})/ , {
        message: '$property should contain atleast 2 Uppercase Character'
    })
    password!: string;


    

}