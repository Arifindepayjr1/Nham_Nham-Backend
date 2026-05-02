import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

const notfoundHtml = readFileSync(
    join(__dirname, "..", "public", "notfound.html"),
    'utf-8'
);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(process.env.PORT ?? 3000);


    console.log(`Running On http://localhost:${process.env.PORT}`);
}
bootstrap();
