import { User } from 'src/modules/auth/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne((type) => User, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id',
    })
    user!: User;
    

    @OneToMany((type) => CartItem, (cartItem) => cartItem.cart, {
      eager: false,
      cascade: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    })
    items!: CartItem[];
    
    
}