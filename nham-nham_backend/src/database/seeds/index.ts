import * as bcrypt from "bcrypt"; 
import { ConfigService } from "@nestjs/config";
import { User } from "src/modules/auth/entities/user.entity";
import { DeliveryPerson } from "src/modules/delivery-person/entities/delivery-person.entity";
import { DataSource } from "typeorm";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Food } from "src/modules/food/entities/food.entity";
import { AddOnOptionGroup } from "src/modules/add-on/entities/add-on-option-group.entity";
import { AddOnOption } from "src/modules/add-on/entities/add-on-option.entity";
import { Injectable } from "@nestjs/common";
import { CartItem } from "src/modules/cart/entities/cart-item.entity";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { SelectedAddOn } from "src/modules/cart/entities/selected-add-on.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Location } from "src/common/embedded/entities/location.entity";
import { OrderItem } from "src/modules/order/entities/order-item.entity";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
class AppSeed{
    
    private DB_HOST;
    private DB_USERNAME;
    private DB_PORT;
    private DB_DATABASE;
    private DB_PASSWORD;

    constructor() {
        this.DB_HOST = process.env.DB_HOST;
        this.DB_DATABASE = process.env.DB_DATABASE;
        this.DB_USERNAME = process.env.DB_USERNAME;
        this.DB_PORT = Number(process.env.DB_PORT);
        this.DB_PASSWORD = process.env.DB_PASSWORD;
    }

    async init() {
        const AppDataSource = new DataSource({
            type: "postgres",
            host: this.DB_HOST,
            database: this.DB_DATABASE,
            username: this.DB_USERNAME,
            port: this.DB_PORT,
            password: this.DB_PASSWORD,
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
        })

        try {
            await AppDataSource.initialize();

            const locationRepo = AppDataSource.getRepository(Location);

            const locations = locationRepo.create([
                { latitude: 11.5564, longitude: 104.9282, address: 'Phnom Penh, Cambodia' },
                { latitude: 11.5620, longitude: 104.9160, address: 'Toul Kork, Phnom Penh' },
                { latitude: 11.5400, longitude: 104.9100, address: 'Chamkarmon, Phnom Penh' },
                { latitude: 11.5700, longitude: 104.9300, address: 'Sen Sok, Phnom Penh' },
                { latitude: 11.5500, longitude: 104.9200, address: 'BKK1, Phnom Penh' },
            ]);
            const savedLocations = await locationRepo.save(locations);

            console.log("LOCATION SEEDED");

            const deliveryPersonRepo = AppDataSource.getRepository(DeliveryPerson);

            const deliveryPersons = deliveryPersonRepo.create([
                { name: 'Dara Sok', phoneNumber: '012345678', currentLocation: savedLocations[3] },
                { name: 'Pisach Lim', phoneNumber: '098765432', currentLocation: savedLocations[4] },
            ]);
            await deliveryPersonRepo.save(deliveryPersons);
            console.log('DELIVERY PERSON SEEDED');

            const userRepo = AppDataSource.getRepository(User);
            const hashedPassword = await bcrypt.hash('password123', 10);

            const users = userRepo.create([
                {
                    userName: 'John Doe',
                    email: 'john@gmail.com',
                    password: String(hashedPassword),
                    phoneNumber: '012000001',
                    location: savedLocations[0],
                },
                {
                    userName: 'Jane Smith',
                    email: 'jane@gmail.com',
                    password: String(hashedPassword),
                    phoneNumber: '012000002',
                    location: savedLocations[1],
                },
            ]);
            await userRepo.save(users);

            console.log('USERS SEEDED');

            const restaurantRepo = AppDataSource.getRepository(Restaurant);

            const restaurants = restaurantRepo.create([
                {
                    name: 'KFC Cambodia',
                    description: 'Kentucky Fried Chicken',
                    rating: 4.5,
                    bannerUrl: 'https://example.com/kfc-banner.jpg',
                    iconUrl: 'https://example.com/kfc-icon.jpg',
                    coverUrl: 'https://example.com/kfc-cover.jpg',
                    location: savedLocations[2],
                },
                {
                    name: 'Pizza Company',
                    description: 'Best pizza in town',
                    rating: 4.2,
                    bannerUrl: 'https://example.com/pizza-banner.jpg',
                    iconUrl: 'https://example.com/pizza-icon.jpg',
                    coverUrl: 'https://example.com/pizza-cover.jpg',
                    location: savedLocations[3],
                },
            ]);
            const savedRestaurants = await restaurantRepo.save(restaurants);
            console.log('RESTAURANTS SEEDED');

            const categoryRepo = AppDataSource.getRepository(Category);

            const categories = categoryRepo.create([
                { name: 'Burger', iconUrl: 'https://example.com/burger.png', restaurant: savedRestaurants[0] },
                { name: 'Chicken', iconUrl: 'https://example.com/chicken.png', restaurant: savedRestaurants[0] },
                { name: 'Pizza', iconUrl: 'https://example.com/pizza.png', restaurant: savedRestaurants[1] },
                { name: 'Drinks', iconUrl: 'https://example.com/drinks.png', restaurant: savedRestaurants[1] },
            ]);
            const savedCategories = await categoryRepo.save(categories);
            console.log('CATEGORIES SEEDED');

            const foodRepo = AppDataSource.getRepository(Food);

            const foods = foodRepo.create([
                {
                    name: 'Zinger Burger',
                    description: 'Crispy spicy chicken burger',
                    price: 5.99,
                    imageUrl: 'https://example.com/zinger.jpg',
                    restaurant: savedRestaurants[0],
                    category: savedCategories[0],
                },
                {
                    name: 'Fried Chicken',
                    description: 'Original recipe fried chicken',
                    price: 4.50,
                    imageUrl: 'https://example.com/fried-chicken.jpg',
                    restaurant: savedRestaurants[0],
                    category: savedCategories[1],
                },
                {
                    name: 'Pepperoni Pizza',
                    description: 'Classic pepperoni with cheese',
                    price: 8.99,
                    imageUrl: 'https://example.com/pepperoni.jpg',
                    restaurant: savedRestaurants[1],
                    category: savedCategories[2],
                },
            ]);
            const savedFoods = await foodRepo.save(foods);
            console.log('FOODS SEEDED');

            const addOnGroupRepo = AppDataSource.getRepository(AddOnOptionGroup);

            const addOnGroups = addOnGroupRepo.create([
                { name: 'Size', food: savedFoods[0] },
                { name: 'Extras', food: savedFoods[0] },
                { name: 'Crust', food: savedFoods[2] },
            ]);
            const savedGroups = await addOnGroupRepo.save(addOnGroups);
            console.log('ADD-ON GROUP SEED');

            const addOnOptionRepo = AppDataSource.getRepository(AddOnOption);

            const addOnOptions = addOnOptionRepo.create([
                { name: 'Small', price: 0.00, addOnOptionGroup: savedGroups[0] },
                { name: 'Medium', price: 0.50, addOnOptionGroup: savedGroups[0] },
                { name: 'Large', price: 1.00, addOnOptionGroup: savedGroups[0] },
                { name: 'Extra Cheese', price: 0.75, addOnOptionGroup: savedGroups[1] },
                { name: 'Extra Sauce', price: 0.50, addOnOptionGroup: savedGroups[1] },
                { name: 'Thin Crust', price: 0.00, addOnOptionGroup: savedGroups[2] },
                { name: 'Thick Crust', price: 0.50, addOnOptionGroup: savedGroups[2] },
            ]);
            await addOnOptionRepo.save(addOnOptions);
            console.log('ADD-ON OPTIONS SEEDED');

            console.log('A SEEDED COMPLETE SUCCESSFULLY!');

            const food = await foodRepo.find({
                relations: {
                    category: true,
                    addOnGroups: true,
                    restaurant: true,
                }
            });
            console.log(food);

        } catch (error) {
            console.error("SEED FAILED: ", error);
        } finally {
            AppDataSource.destroy();
        }
    }
}


async function runSeed() {
    const appSeed = new AppSeed();
    await appSeed.init();
}

runSeed();