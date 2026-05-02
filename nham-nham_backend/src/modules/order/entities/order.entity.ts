import { Location } from 'src/modules/location/entities/location.entity';
import { User } from 'src/modules/auth/entities/user.entity';
import { DeliveryPerson } from 'src/modules/delivery-person/entities/delivery-person.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PREPARING = "preparing",
    ONTHEWAY = "onTheWay",
    DELIVERED = "delivered"
}

enum PaymentMethod {
    CASH = "cash",
    CREDITCARD = "creditCard"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'total_amount',
        type: 'decimal',
        default: 0.0,
        scale: 3,
    })
    totalAmount!: number;

    @Column({
        name: 'status',
        type: 'enum',
        enum: OrderStatus,
        nullable: false,
    })
    status!: OrderStatus;


    @Column({
        name: 'payment_method',
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH,
    })
    paymentMethod!: PaymentMethod;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt!: Date


    @ManyToOne((type) => User, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user!: User;

    @ManyToOne((type) => Restaurant, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    restaurant!: Restaurant;

    @OneToOne((type) => Location, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'pickupLocation_id',
        referencedColumnName: 'id',
    })
    pickupLocation!: Location

    @OneToOne((type) => Location, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'dropOffLocation_id',
        referencedColumnName: 'id',
    })
    dropOffLocation!: Location;


    @ManyToOne((type) => DeliveryPerson, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'delivery_id',
        referencedColumnName: 'id',
    })
    delivery!: DeliveryPerson;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
        eager: false,
        cascade: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    items!: OrderItem[];
}
