import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { SelectedAddOn } from './selected-add-on.entity';

@Entity()
export class CartItem{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'price',
        type: 'decimal',
        scale: 3,
        default: 0.0,
    })
    price!: number;

    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
    })
    quantity!: number;

    @ManyToOne((type) => Cart, (cart) => cart.items, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    cart!: Cart

    @OneToMany((type) => SelectedAddOn, (selectedAddOns) =>  selectedAddOns.cartItem, {
      eager: false,
      cascade: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    })
    selectedAddOns!: SelectedAddOn[];
}