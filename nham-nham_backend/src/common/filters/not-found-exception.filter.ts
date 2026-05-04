import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const notfoundHtml = readFileSync(
    join(__dirname, "..", ".." , "..", "public", "notfound.html"),
    'utf-8'
);

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

      response
          .status(status)
          .setHeader('Content-Type', 'text/html')
          .send(notfoundHtml);
  }
}
