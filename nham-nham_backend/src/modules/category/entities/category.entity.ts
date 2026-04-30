import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category{
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
        name: 'icon_url',
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    iconUrl!: string;

    @ManyToOne((type) => Restaurant, (restaurant) => restaurant.categories, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({
      name: 'restaurant_id',
      referencedColumnName: 'id',
    })
    restaurant!: Restaurant;
    
}