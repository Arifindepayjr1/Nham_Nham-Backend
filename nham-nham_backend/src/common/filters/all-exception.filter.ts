import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionFilterResponse } from './interfaces/exception-response.interface';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException , TypeORMError , NotFoundException)
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse: Partial<ExceptionFilterResponse> = {
            statusCode: status,
            path: request.url,
            timestamp: Date.now().toString(),
            method: request.method,
            message: exception.getResponse(),
        };
      
        if (exception instanceof HttpException) {
            const exceptionResponseMessage = exception.getResponse();
                    return response.json({
                        ...exceptionResponse,
                        message: exceptionResponseMessage,
                    });
                }
                else if (exception instanceof QueryFailedError) {
                    const driverError = exception.driverError
                    const errorCode = driverError?.code;
          

                    switch (errorCode) {
                        case '23505':
                            return response.json({
                                ...exceptionResponse,
                                statusCode: 409, // 409 : Conflict With Current State Resources In The Server
                                message: "Duplicate value",
                            })
                        case '23503':
                            return response.json({
                                ...exceptionResponse,
                                status: 400, // 400 : Cannot Process Due to Client Side Error - Malformed Request Syntax , Invalid Request
                                message: "Invalid References ( Foreign Key )",
                            })
                        default:
                            return response.json({
                                ...exceptionResponse,
                                status: 500,
                                message: "Database Internal Error",
                            })
                    }
                }
        return response.json({
            status: 500,
            message: "Internal Server Error",
        })
    }
}