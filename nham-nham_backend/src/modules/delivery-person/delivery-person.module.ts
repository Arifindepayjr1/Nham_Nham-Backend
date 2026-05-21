import { Module } from '@nestjs/common';
import { DeliveryPersonService } from './delivery-person.service';
import { DeliveryPersonController } from './delivery-person.controller';
import { DeliveryPersonRepository } from './repositories/delivery-person.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPerson } from './entities/delivery-person.entity';
import { Location } from '../location/entities/location.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DeliveryPerson,
            Location,
      ])
  ],
  controllers: [DeliveryPersonController],
  providers: [DeliveryPersonService , DeliveryPersonRepository , JwtAuthGuard,]
})
export class DeliveryPersonModule {}
