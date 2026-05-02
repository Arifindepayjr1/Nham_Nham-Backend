import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './repositories/location.repository';
import { LocationController } from './location.controller';

@Module({
  imports: [
        TypeOrmModule.forFeature([Location],
      ),
    ],
    providers: [
        LocationService,
        LocationRepository
    ],
    controllers: [
        LocationController,
    ],
    exports: [
        LocationRepository
    ]

})
export class LocationModule {}
