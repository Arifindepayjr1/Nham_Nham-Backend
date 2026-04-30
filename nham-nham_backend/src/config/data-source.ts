import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Location } from "src/common/embedded/entities/location.entity";
import { AddOnOptionGroup } from "src/modules/add-on/entities/add-on-option-group.entity";
import { AddOnOption } from "src/modules/add-on/entities/add-on-option.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { CartItem } from "src/modules/cart/entities/cart-item.entity";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { SelectedAddOn } from "src/modules/cart/entities/selected-add-on.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { DeliveryPerson } from "src/modules/delivery-person/entities/delivery-person.entity";
import { Food } from "src/modules/food/entities/food.entity";
import { OrderItem } from "src/modules/order/entities/order-item.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { DataSource , DataSourceOptions} from "typeorm";


export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const dataSource: DataSourceOptions = {
            type: 'postgres',
            host: configService.get("DB_HOST"),
            username: configService.get("DB_USERNAME"),
            port: Number(configService.get<number>("DB_PORT")),
            database: configService.get("DB_DATABASE"),
            password: configService.get("DB_PASSWORD"),
            entities: [
                User,
                AddOnOption,
                AddOnOptionGroup,
                CartItem,
                Cart,
                SelectedAddOn,
                Category,
                DeliveryPerson,
                Food,
                OrderItem,
                Order,
                Restaurant,
                Location,
            ],
            synchronize: true,
        };
        return dataSource;
    },
    dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options!).initialize();
        return dataSource;
    }
}