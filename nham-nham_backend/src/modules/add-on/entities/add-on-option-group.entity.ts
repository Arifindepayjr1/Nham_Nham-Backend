import { Food } from 'src/modules/food/entities/food.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AddOnOption } from './add-on-option.entity';

@Entity()
export class AddOnOptionGroup{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @OneToMany((type) => AddOnOption, (addOnOption) => addOnOption.addOnOptionGroup, {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    })
    options!: AddOnOption[];

    @ManyToOne((type) => Food, (food) => food.addOnGroups, {
      eager: false,
      cascade: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    food!: Food;
}