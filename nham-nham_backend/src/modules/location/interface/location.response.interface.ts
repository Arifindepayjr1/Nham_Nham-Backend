import { HttpStatus } from "@nestjs/common";

export interface ILocationResponse{
    data: [] | Object;
    status: HttpStatus;
    message: String;
}