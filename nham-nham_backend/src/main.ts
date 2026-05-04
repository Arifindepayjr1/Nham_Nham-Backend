import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(
        new AllExceptionFilter(),
        new NotFoundExceptionFilter(),
    );
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Running On http://localhost:${process.env.PORT}`);
}
bootstrap();
