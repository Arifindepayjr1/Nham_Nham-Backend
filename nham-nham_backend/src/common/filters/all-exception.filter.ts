import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionFilterResponse } from './interfaces/exception-response.interface';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const exceptionResponse: Partial<ExceptionFilterResponse> = {
            path: request.url,
            timestamp: Date.now().toString(),
            method: request.method,
            message: 'INTERNAL SERVER ERROR',
        };
      
        if (exception instanceof HttpException) {
            const exceptionResponseMessage = exception.getResponse();
                    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        ...exceptionResponse,
                        message: exceptionResponseMessage,
                    });
                }
                else if (exception instanceof QueryFailedError) {
                    const driverError = exception.driverError
                    const errorCode = driverError?.code;
          

                    switch (errorCode) {
                        case '23505':
                            return response.status(HttpStatus.CONFLICT).json({
                                ...exceptionResponse,
                                // 409 : Conflict With Current State Resources In The Server
                                message: "Duplicate value",
                            })
                        case '23503':
                            return response.status(HttpStatus.BAD_REQUEST).json({
                                ...exceptionResponse,
                                // 400 : Cannot Process Due to Client Side Error - Malformed Request Syntax , Invalid Request
                                message: "Invalid References ( Foreign Key )",
                            });
                        case '22P02':
                            return response.status(HttpStatus.BAD_REQUEST).json({
                                ...exceptionResponse,
                                message: "Invalid Data-Type",
                            })
                        default:
                            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                ...exceptionResponse,
                                message: "Database Internal Error",
                            })
                    }
                }
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
        })
    }
}