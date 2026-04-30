import { OrderItem } from "src/modules/order/entities/order-item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
export class SelectedAddOn{

    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        name: 'price',
        type: 'decimal',
        scale: 3,
        nullable: false,
        default: 0.0,
    })
    price!: number;

    @ManyToOne((type) => OrderItem, (orderItem) => orderItem.selectedAddOns, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: true,
    })
    orderItem!: OrderItem;

    @ManyToOne((type) => CartItem, (cartItem) => cartItem.selectedAddOns, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: true,
    })
    cartItem!: CartItem;
    
    
}