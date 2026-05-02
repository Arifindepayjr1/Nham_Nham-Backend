import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/data-source';
import { LocationModule } from './modules/location/location.module';
import { LocationService } from './modules/location/location.service';
import { LocationRepository } from './modules/location/repositories/location.repository';
import { LocationController } from './modules/location/location.controller';
import { AppController } from './app.controller';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        LocationModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
