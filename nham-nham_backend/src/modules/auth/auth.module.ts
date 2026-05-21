import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtModuleConfig } from 'src/config/jwt-module';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync(jwtModuleConfig)],
  providers: [AuthService , AuthRepository],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
