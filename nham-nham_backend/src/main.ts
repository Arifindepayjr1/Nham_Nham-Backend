import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { ValidationPipe } from '@nestjs/common';

/**
 * Creates the NestJS application, registers global exception filters and a validation pipe, and starts the HTTP server.
 *
 * The validation pipe is configured to whitelist allowed properties, forbid requests with non-whitelisted properties, and transform payloads to DTO types. The server listens on the port specified by `process.env.PORT` or `3000` if unset; the startup URL is logged to the console.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(
        new AllExceptionFilter(),
        new NotFoundExceptionFilter(),
    );
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }),)

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Running On http://localhost:${process.env.PORT}`);
}
bootstrap();
