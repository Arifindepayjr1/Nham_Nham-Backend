import { AddOnOptionGroup } from 'src/modules/add-on/entities/add-on-option-group.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food{
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
        name: 'description',
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    description!: string;

    @Column({
        name: 'price',
        type: 'decimal',
        nullable: false,
        scale: 3,
        default: 0.0,
    })
    price!: number;

    @Column({
        name: 'image_url',
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    imageUrl!: String;
    
    @ManyToOne((type) => Restaurant,{
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

    @ManyToOne((type) => Category,{
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'category_id',
        referencedColumnName: 'id',
    })
    category!: Category;
    
    
    @OneToMany(() => AddOnOptionGroup, (addOnGroups) => addOnGroups.food, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    })
    addOnGroups!: AddOnOptionGroup[];
    
    
    
    
}