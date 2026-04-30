import { Food } from 'src/modules/food/entities/food.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { SelectedAddOn } from 'src/modules/cart/entities/selected-add-on.entity';

@Entity()
export class OrderItem{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
        default: 0,
    })
    quantity!: number;

    @ManyToOne((type) => Food, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'food_id',
        referencedColumnName: 'id',
    })
    food!: Food;
    
    
    @ManyToOne((type) => Order, (order) => order.items , {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    order!: Order;

    @OneToMany((type) => SelectedAddOn, (selectedAddOns) => selectedAddOns.orderItem, {
      eager: false,
      cascade: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    })
    selectedAddOns!: SelectedAddOn[];
    
    
}