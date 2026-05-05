import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/data-source';
import { LocationModule } from './modules/location/location.module';
import { AppController } from './app.controller';
import { DeliveryPersonModule } from './modules/delivery-person/delivery-person.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        LocationModule,
        DeliveryPersonModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
