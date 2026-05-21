import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

export const jwtModuleConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService) : JwtModuleOptions => {
        return {
            global: true,
            secret: configService.get("JWT_SECRET"),
            signOptions: {
                expiresIn: configService.get("JWT_TOKEN_EXPIRE_IN")
            }
        }
    }
    
}