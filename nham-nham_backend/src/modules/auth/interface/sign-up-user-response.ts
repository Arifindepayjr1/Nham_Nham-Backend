import { HttpStatus } from "@nestjs/common";
import { User } from "../entities/user.entity";

export type Token = {
    token: string;
    refreshToken: string;
}


export class IAuthResponse {
    data!: [] | {} | Token;
    status!: HttpStatus;
    message!: string;
}

export class IAuthProfileResponse{
    data!: User;
    status!: HttpStatus;
    message!: string;
}