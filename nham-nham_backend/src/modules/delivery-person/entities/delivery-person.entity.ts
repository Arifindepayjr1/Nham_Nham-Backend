import { Location } from 'src/modules/location/entities/location.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeliveryPerson {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phoneNumber!: string;

    @OneToOne((type) => Location, {
        eager: false,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'current_location',
        referencedColumnName: 'id',
    })
    currentLocation!: Location;



}