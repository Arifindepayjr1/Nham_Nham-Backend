import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddOnOptionGroup } from './add-on-option-group.entity';

@Entity()
export class AddOnOption{
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
        nullable: false,
        default: 0.0,
    })
    price!: number;

    @ManyToOne((type) => AddOnOptionGroup, (addOnOptionGroup) => addOnOptionGroup.options , {
        eager: false,
        cascade: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    addOnOptionGroup!: AddOnOptionGroup;
    
    
}